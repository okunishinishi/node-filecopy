/**
 * Copy files.
 * @function filecopy
 * @param {string} src - Source file to copy from.
 * @param {string} dest - Destination file path.
 * @param {object} [options] - Optional settings.
 * @param {boolean} [options.mkdirp] - Make parent directory if needed.
 * @param {string} [options.mode] - File permission.
 * @returns {Promise}
 */

'use strict'

const argx = require('argx')
const fs = require('fs')
const path = require('path')
const aglob = require('aglob')
const mkdirp = require('mkdirp')
const fileSize = require('./filing/file_size')
const singleCopy = require('./filing/single_copy')
const isExistingDir = require('./filing/is_existing_dir')
const co = require('co')

/** @lends filecopy */
function filecopy (src, dest, options) {
  let args = argx(arguments)
  if (args.pop('function')) {
    throw new Error('Callback is no more supported. Use promise interface.')
  }
  options = args.pop('object') || {}
  dest = args.pop('string')

  return co(function * () {
    if (!dest) {
      throw new Error('dest is required.')
    }
    let { mode } = options
    src = yield aglob(src)
    let destIsDir = yield isExistingDir(dest)
    let results = []
    for (let aSrc of src) {
      let srcFilename = path.resolve(aSrc)
      let destFilename = destIsDir ? path.join(dest, path.basename(aSrc)) : path.resolve(dest)
      if (options.mkdirp) {
        yield new Promise((resolve, reject) =>
          mkdirp(path.dirname(destFilename), (err) =>
            err ? reject(err) : resolve()
          )
        )
      }
      let beforeSize = yield fileSize(destFilename)
      yield singleCopy(srcFilename, destFilename)
      let afterSize = yield fileSize(destFilename)
      if (mode) {
        yield new Promise((resolve, reject) =>
          fs.chmod(destFilename, mode, (err) =>
            err ? reject(err) : resolve()
          )
        )
      }
      results.push({
        filename: destFilename,
        changed: beforeSize !== afterSize
      })
    }
    let changed = {}
    results
      .filter((result) => result.changed)
      .forEach((result) => {
        let filename = result.filename
        changed[ filename ] = true
      })
    return changed
  })
}

module.exports = filecopy
