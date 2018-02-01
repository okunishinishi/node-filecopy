/**
 * @function isExistingDir
 * @returns {Promise}
 * @private
 */

'use strict'

const fs = require('fs')

async function isExistingDir (filename, callback) {
  const exists = await new Promise((resolve) =>
    fs.exists(filename, (exists) => resolve(exists))
  )
  if (!exists) {
    return false
  }
  const state = await new Promise((resolve, reject) =>
    fs.stat(filename, (err, state) =>
      err ? reject(err) : resolve(state)
    )
  )
  return state.isDirectory()
}

module.exports = isExistingDir
