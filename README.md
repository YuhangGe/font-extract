font-extract
============

extract special chars from ttf/otf file to generate little ttf/woff file

从ttf/otf字体文件中提取出特定的字符，然后组成新的字体ttf/woff文件。
这个工具可以用来提取很大的字体中的特定的汉字，然后生成webfont，
从而减少webfont的体积。

该项目是在opentype.js和svg2ttf的代码上进行了微量的修改后，组合起来的。

Bugs
--------
* 目前生成的ttf文件中的字母和数字不正确。（其实是node-freetype库的bug）.

Usage
-----------
`font-extract [-b] -c 超级帐号 ttf_file output_file`

* -b --base include base chars `a-zA-Z0-9` 是否包含a-zA-Z0-9这样一些基本的字符
* -c --char chars to be extracted 需要提取的文字。
* ttf_file source font file 源字体文件
* output_file  output font file 输出的字体文件。如果后缀名是ttf则生成ttf文件，如果是woff则生成woff文件。

Todo
--------
* -c 参数支持范围指定。类似于  a-z\x0a-\xff\u0045-\u4762
