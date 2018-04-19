/**
 * parser.js created by thematthewchen on 4/12/18 based off of parser.js from SOCR/DVT 
 * from shusa_000 on 7/9/2015.
 */

/**
 * Create a parser for binary or ascii data.
 *
 * @constructor
 * 
 */
Parser = function() {//console.count('parser.constructor');

    //
    // class attributes

    /**
     * @inheritDoc
     * @const
     */
    this._classname = 'parser';

    /**
     * The data.
     *
     * @type {?ArrayBuffer}
     * @protected
     */
    this._data = null;

    /**
     * The pointer to the current byte.
     *
     * @type {!number}
     * @protected
     */
    this._dataPointer = 0;

    /**
     * The native endianness flag. Based on
     * https://github.com/kig/DataStream.js/blob/master/DataStream.js
     *
     * @type {!boolean}
     * @protected
     */
    this._nativeLittleEndian = new Int8Array(new Int16Array([ 1 ]).buffer)[0] > 0;

    /**
     * The data-specific endianness flag.
     *
     * @type {!boolean}
     * @protected
     */
    this._littleEndian = true;

    /**
     * The min value of the last parsing attempt.
     *
     * @type {!number}
     * @protected
     */
    this._lastMin = -Infinity;

    /**
     * The max value of the last parsing attempt.
     *
     * @type {!number}
     * @protected
     */
    this._lastMax = Infinity;

};

//
// PARSE FUNCTIONS
//
//

/**
 * Jump to a position in the byte stream.
 *
 * @param {!number}
 *          position The new offset.
 */
Parser.prototype.jumpTo = function(position) {//console.count('parser.jumpto');

    this._dataPointer = position;

};


/**
 * Scan binary data relative to the internal position in the byte stream.
 *
 * @param {!string}
 *          type The data type to scan, f.e.
 *          'uchar','schar','ushort','sshort','uint','sint','float'
 * @param {!number=}
 *          chunks The number of chunks to scan. By default, 1.
 */
Parser.prototype.scan = function(type, rawdata, chunks) {//console.count('parser.scan');

    /*if (!goog.isDefAndNotNull(chunks)) {

        chunks = 1;

    }*/

    var _chunkSize = 1;
    var _array_type = Uint8Array;

    switch (type) {

        // 1 byte data types
        case 'uchar':
            break;
        case 'schar':
            _array_type = Int8Array;
            break;
        // 2 byte data types
        case 'ushort':
            _array_type = Uint16Array;
            _chunkSize = 2;
            break;
        case 'sshort':
            _array_type = Int16Array;
            _chunkSize = 2;
            break;
        // 4 byte data types
        case 'uint':
            _array_type = Uint32Array;
            _chunkSize = 4;
            break;
        case 'sint':
            _array_type = Int32Array;
            _chunkSize = 4;
            break;
        case 'float':
            _array_type = Float32Array;
            _chunkSize = 4;
            break;
        case 'complex':
            _array_type = Float64Array;
            _chunkSize = 8;
            break;
        case 'double':
            _array_type = Float64Array;
            _chunkSize = 8;
            break;

    }

    // increase the data pointer in-place
    var _bytes = new _array_type(rawdata.slice(this._dataPointer,
        this._dataPointer += chunks * _chunkSize));

    // if required, flip the endianness of the bytes
    if (this._nativeLittleEndian != this._littleEndian) {

        // we need to flip here since the format doesn't match the native endianness
        _bytes = this.flipEndianness(_bytes, _chunkSize);

    }
    
    if (chunks == 1) {

        // if only one chunk was requested, just return one value
        return _bytes[0];

    }

    // return the byte array
    return _bytes;

};


/**
 * Flips typed array endianness in-place. Based on
 * https://github.com/kig/DataStream.js/blob/master/DataStream.js.
 *
 * @param {!Object}
 *          array Typed array to flip.
 * @param {!number}
 *          chunkSize The size of each element.
 * @return {!Object} The converted typed array.
 */
Parser.prototype.flipEndianness = function(array, chunkSize) {//console.count('parser.flipEndianness');

    var u8 = new Uint8Array(array.buffer, array.byteOffset, array.byteLength);
    for ( var i = 0; i < array.byteLength; i += chunkSize) {

        for ( var j = i + chunkSize - 1, k = i; j > k; j--, k++) {

            var tmp = u8[k];
            u8[k] = u8[j];
            u8[j] = tmp;

        }

    }

    return array;

};