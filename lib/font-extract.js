var fs = require('fs');
var path = require('path');
var opentype = require('opentype.js/src/opentype.js');
var sfnt    = require('svg2ttf/lib/sfnt.js');
var _ = require('underscore');
var ttf2woff = require('ttf2woff');

module.exports.extract = extract;
module.exports.toArrayBuffer = toArrayBuffer;
module.exports.convert = convert;

function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

function convert(src_filename, charset, dest_filename) {
    var is = fs.readFileSync(src_filename);
    var ttf = toArrayBuffer(is);
    var fmt = path.extname(dest_filename).substring(1);
    var out = extract(ttf, charset, fmt === 'ttf' ? 'ttf' : 'woff');
    fs.writeFileSync(dest_filename, out);
}

function extract(src_ttf, charset, format) {
    if(format !== 'ttf') {
        format = 'woff';
    }

}

