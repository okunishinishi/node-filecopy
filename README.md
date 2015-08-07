filecopy
==========

[![Build Status][my_travis_badge_url]][my_travis_url]
[![Code Climate][my_codeclimate_badge_url]][my_codeclimate_url]
[![Code Coverage][my_codeclimate_coverage_badge_url]][my_codeclimate_url]
[![npm version][my_npm_budge_url]][my_npm_url]

Copy files.


Usage
----

### Copy a signle file.

```javascript
#!/usr/bin/env/node

var filecopy = require('filecopy');

filecopy('src/some-text01.txt', 'dest/some-text01-copy.txt', {
    mkdirp: true
}, function(err){
    /*...*/
});

```

### Copy multiple files.

```javascript
#!/usr/bin/env node

var filecopy = require('filecopy');

// Copy all files in src directory to dir.
filecopy('src/*.txt', 'dest', {}, function (err) {
    /*...*/
});

```


Installation
----

```javascript
$ npm install filecopy --save
```


License
-------
This software is released under the [MIT License][my_license_url].


Links
------



[npm_url]: https://www.npmjs.org/
[my_repo_url]: https://github.com/ape-repo/filecopy
[my_travis_url]: http://travis-ci.org/ape-repo/filecopy
[my_travis_badge_url]: http://img.shields.io/travis/ape-repo/filecopy.svg?style=flat
[my_license_url]: https://github.com/ape-repo/filecopy/blob/master/LICENSE
[my_codeclimate_url]: http://codeclimate.com/github/ape-repo/filecopy
[my_codeclimate_badge_url]: http://img.shields.io/codeclimate/github/ape-repo/filecopy.svg?style=flat
[my_codeclimate_coverage_badge_url]: http://img.shields.io/codeclimate/coverage/github/ape-repo/filecopy.svg?style=flat
[my_coverage_url]: http://ape-repo.github.io/filecopy/coverage/lcov-report
[my_npm_url]: http://www.npmjs.org/package/filecopy
[my_npm_budge_url]: http://img.shields.io/npm/v/filecopy.svg?style=flat

