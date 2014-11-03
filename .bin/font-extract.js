#!/usr/bin/env node
var font = require('../index.js');
var fs = require('fs');
var _ = require('underscore');

var opt = require('yargs')
    .usage('Font Extract - extract special chars form ttf/otf file and generate new ttf/woff file.\n'
            + 'Usage: $0 [-b] -c 超级帐号 ttf_file output_file')
    .demand(['c'])
    .alias('b', 'base')
    .alias('c', 'char')
    .describe('b', 'whether include base chars: a-zA-Z0-9')
    .describe('c', 'chars to be extracted');

var argv = opt.argv;

if(argv._.length !== 2) {
    opt.showHelp();
    return;
}

var charset = argv.char;
if(!charset || _.isEmpty(charset)) {
    console.error('charset must not be empty!');
    opt.showHelp();
    return;
}


if(argv.b) {
    charset += 'abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ0123456789,.!@#$%&*()_-+';
}

//remove repeat chars
charset = charset.replace(/(.)(?=.*\1)/g, "");

try {
    console.log('Converting...');
    font.convert(argv._[0], charset, argv._[1]);
    console.log('...Done!');
} catch(ex) {
    console.error('...Error: ', ex);
}
