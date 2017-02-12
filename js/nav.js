/**
 * Created by jakeclose on 2/12/17.
 */



$("#next_module").click(function () {
    $next_module =  $("li.active").next();
    $("li.active").removeClass("active");
    $next_module.attr("class", "active")

});








$("#previous_module").click(function () {
    $prev_module =  $("li.active").prev();
    $("li.active").removeClass("active");
    $prev_module.attr("class", "active")



});