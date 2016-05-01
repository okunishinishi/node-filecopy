/**
 * @function fileSize
 * @returns {Promise}
 */

'use strict'

const fs = require('fs')
const co = require('co')

/** @lends fileSize */
function fileSize (filename) {
  return co(function * () {
    let exists = yield new Promise((resolve) =>
      fs.exists(filename, (exists) => resolve(exists))
    )
    if (!exists) {
      return 0
    }
    let state = yield new Promise((resolve, reject) =>
      fs.stat(filename, (err, state) =>
        err ? reject(err) : resolve(state)
      )
    )
    return state[ 'size' ]
  })
}

module.exports = fileSize
