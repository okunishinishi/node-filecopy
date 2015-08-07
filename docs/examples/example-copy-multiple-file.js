/**
 * This is an example to copy a multiple file.
 */

"use strict";

var filecopy = require('filecopy');

// Copy all files in src directory to dir.
filecopy('src/*.txt', 'dest', {

}, function(err){
    /*...*/
});
