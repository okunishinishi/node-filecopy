/**
 * Copy files.
 * @function filecopy
 * @param {string} src - Source file to copy from.
 * @param {string} dest - Destination file path.
 * @param {object} [options] - Optional settings.
 * @param {boolean} [options.mkdirp] - Make parent directory if needed.
 * @param {function} [callback] - Callback when done.
 */

"use strict";

var argx = require('argx'),
    async = require('async'),
    path = require('path'),
    glob = require('glob'),
    mkdirp = require('mkdirp'),
    fs = require('fs');


/** @lends filecopy */
function filecopy(src, dest, options, callback) {
    var args = argx(arguments);
    callback = args.pop('function') || argx.noop;
    options = args.pop('object') || {};
    dest = args.pop('string');
    if (!dest) {
        callback(new Error('dest is required.'));
        return;
    }
    async.waterfall([
        function (callback) {
            async.concatSeries([].concat(src), glob, callback);
        },
        function (src, callback) {
            _isExistingDir(dest, function (destIsDir) {
                async.each(src, function (src, callback) {
                    var srcFilename = path.resolve(src),
                        destFilename = destIsDir ? path.join(dest, path.basename(src)) : path.resolve(dest);
                    async.series([
                        function (callback) {
                            if (options.mkdirp) {
                                mkdirp(path.dirname(destFilename), callback);
                            } else {
                                callback(null);
                            }
                        },
                        function (callback) {
                            _copySingle(srcFilename, destFilename, callback);
                        }
                    ], callback);
                }, callback);
            });
        }
    ], callback);
}

function _copySingle(src, dest, callback) {
    var aborted = false;

    var r = fs.createReadStream(src),
        w = fs.createWriteStream(dest);
    r.on("error", function (err) {
        done(err);
    });
    w.on("error", function (err) {
        done(err);
    });
    w.on("close", function (ex) {
        done();
    });
    r.pipe(w);

    function done(err) {
        if (aborted) {
            return;
        }
        callback(err);
        aborted = true;
    }
}

function _isExistingDir(filename, callback) {
    fs.exists(filename, function (exists) {
        if (exists) {
            fs.stat(filename, function (err, stat) {
                callback(!err && stat.isDirectory());
            });
        } else {
            callback(false);
        }
    });
}

module.exports = filecopy;