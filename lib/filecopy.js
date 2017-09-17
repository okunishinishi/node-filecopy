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

/** @lends filecopy */
async function filecopy (src, dest, options) {
  const args = argx(arguments)
  if (args.pop('function')) {
    throw new Error('Callback is no more supported. Use promise interface.')
  }
  options = args.pop('object') || {}
  dest = args.pop('string')

  if (!dest) {
    throw new Error('dest is required.')
  }
  const {mode} = options
  src = await aglob(src)
  const destIsDir = await isExistingDir(dest)
  const results = []
  for (const aSrc of src) {
    const srcFilename = path.resolve(aSrc)
    const destFilename = destIsDir ? path.join(dest, path.basename(aSrc)) : path.resolve(dest)
    if (options.mkdirp) {
      await new Promise((resolve, reject) =>
        mkdirp(path.dirname(destFilename), (err) =>
          err ? reject(err) : resolve()
        )
      )
    }
    const beforeSize = await fileSize(destFilename)
    await singleCopy(srcFilename, destFilename)
    const afterSize = await fileSize(destFilename)
    if (mode) {
      await new Promise((resolve, reject) =>
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
  const changed = {}
  results
    .filter((result) => result.changed)
    .forEach((result) => {
      let filename = result.filename
      changed[filename] = true
    })
  return changed
}

module.exports = filecopy
