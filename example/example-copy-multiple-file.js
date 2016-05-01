#!/usr/bin/env node
'use strict'

const filecopy = require('filecopy')

// Copy all files in src directory to dir.
filecopy('src/*.txt', 'dest', {}).then(() => {
  /* ... */
})
