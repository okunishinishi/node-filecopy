/**
 * @function _copySingle
 * @private
 */

"use strict";

var fs = require('fs');

/** @lends _copySingle */
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

module.exports = _copySingle;
