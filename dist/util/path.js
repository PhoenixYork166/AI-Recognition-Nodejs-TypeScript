"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootDir = void 0;
const path = require("path");
/* return the directory name of a path
process.mainModule has become deprecated since Node v14.0.0 */
// module.exports = path.dirname(process.mainModule.filename);
// rootDir
exports.rootDir = (function () {
    if (require.main && require.main.filename) {
        return path.dirname(require.main.filename);
    }
    else {
        // Handle case `require.main` is undefined
        throw new Error(`\nCannot determine rootDir cuz 'require.main.filename' is undefined\n`);
    }
});
// module.exports = path.dirname(require.main.filename);
//# sourceMappingURL=path.js.map