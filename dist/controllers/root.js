"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRoot = void 0;
// create / route
const handleRoot = (req, res, db) => {
    const query = `SELECT * FROM users JOIN login ON users.email = login.email`;
    db
        .select('*')
        .from('users')
        .join('login', function () {
        this
            .on('users.email', '=', 'login.email')
            .orOn('users.id', '=', 'login.id');
    })
        .then((response) => {
        if (response) {
            res.status(200).json(response);
        }
        else {
            console.log(`\nError to run SQL: ${query}\n`);
            res.status(400).json({ error: 'Cannot fetch database' });
        }
    })
        .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
};
exports.handleRoot = handleRoot;
//# sourceMappingURL=root.js.map