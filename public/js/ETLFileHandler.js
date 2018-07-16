var fs = require('fs');

function inputFile(filepath, filename) {
    var readStream = fs.createReadStream(filepath + filename);

    readStream.on('data', function(chunk) {
        data += chunk;
    }).on('end', function() {
        console.log(data);
    });

}

function accessChunk(loc, len) {
    // read buffer of loc length if loc < 65536
    // if loc > 65536 read loc/65536 chunks and then read buffer of loc % 65536 length
    // after buffer is done reading, create buffer of len length and read into it
    // extract from this buffer and return data
    if (loc < 65536) {
        const buffer = Buffer.alloc(loc);
        buffer.write();
    }

}