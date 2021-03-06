/**
 * Test for filecopy.js
 * Runs with mocha.
 */

'use strict'

const filecopy = require('../lib/filecopy.js')
const path = require('path')
const mkdirp = require('mkdirp')
const fs = require('fs')

const assert = require('assert')

describe('filecopy', () => {
  it('Copy a single file with permission.',async () => {
    let src = String(__filename)
    let dest = 'tmp/foo/bar/copy11.txt'
    await filecopy(src, dest, {
      mkdirp: true,
      mode: '444'
    })
    assert.ok(fs.existsSync(dest))
  })

  it('Copy a single file.',async () => {
    let src = String(__filename)
    let dest = 'tmp/foo/bar/copy01.txt'
    await filecopy(src, dest, {
      mkdirp: true
    })
    assert.ok(fs.existsSync(dest))
  })

  it('Copy multiple files.',async () => {
    let src = String(__dirname) + '/*.js'
    let dest = 'tmp/foo/bar/baz'
    mkdirp.sync(dest)
    let results = await filecopy(src, dest, {
      mkdirp: true
    })
    assert.ok(fs.existsSync(dest + '/' + path.basename(__filename)))
    assert.ok(results)
  })
})

/* global describe, before, after, it */
