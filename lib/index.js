/**
 * Copy files.
 * @module filecopy
 * @version 2.0.0
 */

'use strict'

const filecopy = require('./filecopy')
const pkg = require('../package.json')

let lib = filecopy.bind(this)

Object.assign(lib, {
  filecopy,
  version: pkg.version
})

module.exports = lib
