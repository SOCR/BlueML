var fs = require('fs');
var Papa = require('papaparse');

const BinaryFile = require('binary-file');


function inputFile(filepath, filename) {
    var binFile = new BinaryFile(filepath + filename, 'r', true);

    binFile.open();
    binFile.close();
}

(async function() {
    try {
        await binFile.open();
        await binFile.close();
    } catch (err) {
        console.log(`There was an error: ${err}`);
    }
}) ();

function accessChunk(loc,len, bf) {
    const data = bf.read(len, bf.seek(loc));
    return data;
}

// function inputFile(filepath, filename) {
//     var readStream = fs.createReadStream(filepath + filename);
//
//     readStream.on('data', function(chunk) {
//         data += chunk;
//     }).on('end', function() {
//         console.log(data);
//     });
//
// }
//
// function accessChunk(loc, len) {
//     // read buffer of loc length if loc < 65536
//     // if loc > 65536 read loc/65536 chunks and then read buffer of loc % 65536 length
//     // after buffer is done reading, create buffer of len length and read into it
//     // extract from this buffer and return data
//     if (loc < 65536) {
//         const buffer = Buffer.alloc(loc);
//         buffer.write();
//     }
//
// }

function parse_csv_server(path) {
    var data_set = Papa.parse(path, {header : true});
};


