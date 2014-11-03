var fs = require('fs');
var path = require('path');
var freetype = require('node-freetype');
var _ = require('underscore');

module.exports.extract = extract;
module.exports.convert = convert;


function convert(src_filename, charset, dest_filename) {
    var is = fs.readFileSync(src_filename);
    var fmt = path.extname(dest_filename).substring(1);
    var out = extract(is, charset, fmt === 'ttf' ? 'ttf' : 'woff');
    fs.writeFileSync(dest_filename, out);
}

function extract(src, charset, format) {
    if(format !== 'ttf' || format !== 'otf') {
        format = 'woff';
    }
    var font = freetype.parse(src);
    var ttf = font.generateSubFont(charset);
    //var ttf_buffer = ttf.toTTF();
    if(format === 'ttf') {
        return ttf.toTTF();
    } else if(format === 'woff') {
        return ttf.toWOFF();
    } else {
        throw 'todo: support otf format.';
    }
}

