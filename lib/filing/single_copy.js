/**
 * Copy a single file
 * @function singleCopy
 * @returns {Promise}
 */

'use strict'

const fs = require('fs')

/** @lends singleCopy */
async function singleCopy (src, dest) {
  const exists = await new Promise((resolve) =>
    fs.exists(dest, (exists) => resolve(exists))
  )
  if (exists) {
    await new Promise((resolve, reject) =>
      fs.chmod(dest, '777', (err) =>
        err ? reject(err) : resolve()
      )
    )
  }

  await new Promise((resolve, reject) => {
    let aborted = false

    const r = fs.createReadStream(src)
    const w = fs.createWriteStream(dest)
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
}

module.exports = singleCopy
