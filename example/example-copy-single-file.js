#!/usr/bin/env/node
'use strict'

const filecopy = require('filecopy')

filecopy('src/some-text01.txt', 'dest/some-text01-copy.txt', {
  mkdirp: true
}).then(() => {
  /* ... */
});
