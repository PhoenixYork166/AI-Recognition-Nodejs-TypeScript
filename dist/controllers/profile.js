"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleProfileGet = void 0;
const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({
        id: id
    })
        .then(user => {
        if (user.length) {
            res.json(user[0]);
        }
        else {
            res.status(400).json('user NOT found');
        }
    })
        .catch(err => res.status(400).json(`error getting user:\n${err}`));
};
exports.handleProfileGet = handleProfileGet;
//# sourceMappingURL=profile.js.map