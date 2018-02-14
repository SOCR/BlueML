import { Directive, Output, EventEmitter, ContentChildren } from "@angular/core";
import { UISref } from "./uiSref";
import { anyTrueR, tail, unnestR } from "ui-router-core";
import { UIRouterGlobals } from "ui-router-core";
import { Param } from "ui-router-core";
import { PathFactory } from "ui-router-core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
/** @internalapi */
var inactiveStatus = {
    active: false,
    exact: false,
    entering: false,
    exiting: false
};
/**
 * Returns a Predicate<PathNode[]>
 *
 * The predicate returns true when the target state (and param values)
 * match the (tail of) the path, and the path's param values
 *
 * @internalapi
 */
var pathMatches = function (target) {
    if (!target.exists())
        return function () { return false; };
    var state = target.$state();
    var targetParamVals = target.params();
    var targetPath = PathFactory.buildPath(target);
    var paramSchema = targetPath.map(function (node) { return node.paramSchema; })
        .reduce(unnestR, [])
        .filter(function (param) { return targetParamVals.hasOwnProperty(param.id); });
    return function (path) {
        var tailNode = tail(path);
        if (!tailNode || tailNode.state !== state)
            return false;
        var paramValues = PathFactory.paramValues(path);
        return Param.equals(paramSchema, paramValues, targetParamVals);
    };
};
/**
 * Given basePath: [a, b], appendPath: [c, d]),
 * Expands the path to [c], [c, d]
 * Then appends each to [a,b,] and returns: [a, b, c], [a, b, c, d]
 *
 * @internalapi
 */
function spreadToSubPaths(basePath, appendPath) {
    return appendPath.map(function (node) { return basePath.concat(PathFactory.subPath(appendPath, function (n) { return n.state === node.state; })); });
}
/**
 * Given a TransEvt (Transition event: started, success, error)
 * and a UISref Target State, return a SrefStatus object
 * which represents the current status of that Sref:
 * active, activeEq (exact match), entering, exiting
 *
 * @internalapi
 */
function getSrefStatus(event, srefTarget) {
    var pathMatchesTarget = pathMatches(srefTarget);
    var tc = event.trans.treeChanges();
    var isStartEvent = event.evt === 'start';
    var isSuccessEvent = event.evt === 'success';
    var activePath = isSuccessEvent ? tc.to : tc.from;
    var isActive = function () {
        return spreadToSubPaths([], activePath)
            .map(pathMatchesTarget)
            .reduce(anyTrueR, false);
    };
    var isExact = function () {
        return pathMatchesTarget(activePath);
    };
    var isEntering = function () {
        return spreadToSubPaths(tc.retained, tc.entering)
            .map(pathMatchesTarget)
            .reduce(anyTrueR, false);
    };
    var isExiting = function () {
        return spreadToSubPaths(tc.retained, tc.exiting)
            .map(pathMatchesTarget)
            .reduce(anyTrueR, false);
    };
    return {
        active: isActive(),
        exact: isExact(),
        entering: isStartEvent ? isEntering() : false,
        exiting: isStartEvent ? isExiting() : false,
    };
}
/** @internalapi */
function mergeSrefStatus(left, right) {
    return {
        active: left.active || right.active,
        exact: left.exact || right.exact,
        entering: left.entering || right.entering,
        exiting: left.exiting || right.exiting,
    };
}
/**
 * A directive which emits events when a paired [[UISref]] status changes.
 *
 * This directive is primarily used by the [[UISrefActive]] directives to monitor `UISref`(s).
 *
 * This directive shares two attribute selectors with `UISrefActive`:
 *
 * - `[uiSrefActive]`
 * - `[uiSrefActiveEq]`.
 *
 * Thus, whenever a `UISrefActive` directive is created, a `UISrefStatus` directive is also created.
 *
 * Most apps should simply use `UISrefActive`, but some advanced components may want to process the
 * [[SrefStatus]] events directly.
 *
 * ```js
 * <li (uiSrefStatus)="onSrefStatusChanged($event)">
 *   <a uiSref="book" [uiParams]="{ bookId: book.id }">Book {{ book.name }}</a>
 * </li>
 * ```
 *
 * The `uiSrefStatus` event is emitted whenever an enclosed `uiSref`'s status changes.
 * The event emitted is of type [[SrefStatus]], and has boolean values for `active`, `exact`, `entering`, and `exiting`.
 *
 * The values from this event can be captured and stored on a component (then applied, e.g., using ngClass).
 *
 * ---
 *
 * A single `uiSrefStatus` can enclose multiple `uiSref`.
 * Each status boolean (`active`, `exact`, `entering`, `exiting`) will be true if *any of the enclosed `uiSref` status is true*.
 * In other words, all enclosed `uiSref` statuses  are merged to a single status using `||` (logical or).
 *
 * ```js
 * <li (uiSrefStatus)="onSrefStatus($event)" uiSref="admin">
 *   Home
 *   <ul>
 *     <li> <a uiSref="admin.users">Users</a> </li>
 *     <li> <a uiSref="admin.groups">Groups</a> </li>
 *   </ul>
 * </li>
 * ```
 *
 * In the above example, `$event.active === true` when either `admin.users` or `admin.groups` is active.
 *
 * ---
 *
 * This API is subject to change.
 */
export var UISrefStatus = (function () {
    function UISrefStatus(_globals) {
        /** current statuses of the state/params the uiSref directive is linking to */
        this.uiSrefStatus = new EventEmitter(false);
        this._globals = _globals;
        this.status = Object.assign({}, inactiveStatus);
    }
    UISrefStatus.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Map each transition start event to a stream of:
        // start -> (success|error)
        var transEvents$ = this._globals.start$.switchMap(function (trans) {
            var event = function (evt) { return ({ evt: evt, trans: trans }); };
            var transStart$ = Observable.of(event("start"));
            var transResult = trans.promise.then(function () { return event("success"); }, function () { return event("error"); });
            var transFinish$ = Observable.fromPromise(transResult);
            return transStart$.concat(transFinish$);
        });
        // Watch the @ContentChildren UISref[] components and get their target states
        // let srefs$: Observable<UISref[]> = Observable.of(this.srefs.toArray()).concat(this.srefs.changes);
        this._srefs$ = new BehaviorSubject(this.srefs.toArray());
        this._srefChangesSub = this.srefs.changes.subscribe(function (srefs) { return _this._srefs$.next(srefs); });
        var targetStates$ = this._srefs$.switchMap(function (srefs) {
            return Observable.combineLatest(srefs.map(function (sref) { return sref.targetState$; }));
        });
        // Calculate the status of each UISref based on the transition event.
        // Reduce the statuses (if multiple) by or-ing each flag.
        this._subscription = transEvents$.mergeMap(function (evt) {
            return targetStates$.map(function (targets) {
                var statuses = targets.map(function (target) { return getSrefStatus(evt, target); });
                return statuses.reduce(mergeSrefStatus);
            });
        }).subscribe(this._setStatus.bind(this));
    };
    UISrefStatus.prototype.ngOnDestroy = function () {
        if (this._subscription)
            this._subscription.unsubscribe();
        if (this._srefChangesSub)
            this._srefChangesSub.unsubscribe();
        if (this._srefs$)
            this._srefs$.unsubscribe();
        this._subscription = this._srefChangesSub = this._srefs$ = undefined;
    };
    UISrefStatus.prototype._setStatus = function (status) {
        this.status = status;
        this.uiSrefStatus.emit(status);
    };
    UISrefStatus.decorators = [
        { type: Directive, args: [{ selector: '[uiSrefStatus],[uiSrefActive],[uiSrefActiveEq]' },] },
    ];
    /** @nocollapse */
    UISrefStatus.ctorParameters = function () { return [
        { type: UIRouterGlobals, },
    ]; };
    UISrefStatus.propDecorators = {
        'uiSrefStatus': [{ type: Output, args: ["uiSrefStatus",] },],
        'srefs': [{ type: ContentChildren, args: [UISref, { descendants: true },] },],
    };
    return UISrefStatus;
}());
//# sourceMappingURL=uiSrefStatus.js.map