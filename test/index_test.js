/**
 * Test for index.js
 * Runs with mocha.
 */

'use strict'

const index = require('../lib/index')

const assert = require('assert')

it('Eval properties.', () => {
  assert.ok(index)
  Object.keys(index).forEach((key) => {
    assert.ok(key)
    assert.ok(index[key])
  })
})

/* global it */
