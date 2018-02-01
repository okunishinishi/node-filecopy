/**
 * @function fileSize
 * @returns {Promise}
 */

'use strict'

const fs = require('fs')

/** @lends fileSize */
async function fileSize (filename) {
  const exists = await new Promise((resolve) =>
    fs.exists(filename, (exists) => resolve(exists))
  )
  if (!exists) {
    return 0
  }
  const state = await new Promise((resolve, reject) =>
    fs.stat(filename, (err, state) =>
      err ? reject(err) : resolve(state)
    )
  )
  return state['size']
}

module.exports = fileSize
