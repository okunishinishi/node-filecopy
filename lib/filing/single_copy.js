/**
 * Copy a single file
 * @function singleCopy
 * @returns {Promise}
 */

'use strict'

const fs = require('fs')
const co = require('co')

/** @lends singleCopy */
function singleCopy (src, dest) {
  return co(function * () {
    let exists = yield new Promise((resolve) =>
      fs.exists(dest, (exists) => resolve(exists))
    )
    if (exists) {
      yield new Promise((resolve, reject) =>
        fs.chmod(dest, '777', (err) =>
          err ? reject(err) : resolve()
        )
      )
    }

    yield new Promise((resolve, reject) => {
      let aborted = false

      let r = fs.createReadStream(src)
      let w = fs.createWriteStream(dest)
      r.on('error', (err) => done(err))
      w.on('error', (err) => done(err))
      w.on('close', (ex) => done())
      r.pipe(w)

      function done (err) {
        if (aborted) {
          return
        }
        aborted = true
        err ? reject(err) : resolve()
      }
    })
  })
}

module.exports = singleCopy
