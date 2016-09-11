/**
 * Copy files.
 * @module filecopy
 * @version 2.1.2
 */

'use strict'

const filecopy = require('./filecopy')

let lib = filecopy.bind(this)

Object.assign(lib, {
  filecopy
})

module.exports = lib
