/**
 * Copy files.
 * @module filecopy
 * @version 4.0.2
 */

'use strict'

const filecopy = require('./filecopy')

const lib = filecopy.bind(this)

Object.assign(lib, {
  filecopy
})

module.exports = lib
