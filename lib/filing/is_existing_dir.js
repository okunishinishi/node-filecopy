/**
 * @function isExistingDir
 * @returns {Promise}
 * @private
 */

'use strict'

const fs = require('fs')
const co = require('co')

function isExistingDir (filename, callback) {
  return co(function * () {
    let exists = yield new Promise((resolve) =>
      fs.exists(filename, (exists) => resolve(exists))
    )
    if (!exists) {
      return false
    }
    let state = yield new Promise((resolve, reject) =>
      fs.stat(filename, (err, state) =>
        err ? reject(err) : resolve(state)
      )
    )
    return state.isDirectory()
  })
}

module.exports = isExistingDir
