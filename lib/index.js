/**
 * Copy files.
 * @module filecopy
 * @version 1.0.7
 */

"use strict";

var filecopy = require('./filecopy'),
    pkg = require('../package.json');

var lib = filecopy.bind(this);

lib.filecopy = filecopy;
lib.version = pkg;

module.exports = lib;
