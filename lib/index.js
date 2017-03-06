/**
 * Copy files.
 * @module filecopy
 * @version 3.0.1
 */

'use strict'

const filecopy = require('./filecopy')

let lib = filecopy.bind(this)

Object.assign(lib, {
  filecopy
})

module.exports = lib
