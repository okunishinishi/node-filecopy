/**
 * Copy files.
 * @module filecopy
 * @version 2.0.3
 */

'use strict'

const filecopy = require('./filecopy')

let lib = filecopy.bind(this)

Object.assign(lib, {
  filecopy
})

module.exports = lib
