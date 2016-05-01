/**
 * Test for index.js
 * Runs with mocha.
 */

'use strict'

const index = require('../lib/index')
const co = require('co')
const assert = require('assert')

it('Eval properties.', () => co(function * () {
  assert.ok(index)
  Object.keys(index).forEach((key) => {
    assert.ok(key)
    assert.ok(index[ key ])
  })
}))

/* global it */
