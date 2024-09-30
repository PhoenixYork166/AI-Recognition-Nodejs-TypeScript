"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRegister = void 0;
const bcryptjs_1 = require("bcryptjs");
// Method 1 async/await
// export const handleRegister = async(req: Request, res: Response, db: Knex) => {
//     // Destructuring from req.body
//     const { email, name, password } = req.body;
//     // If malicious users bypass frontend validation in <Register />
//     // like using Postman
//     if (!email || !name || !password ) {
//         res.status(400).json('invalid inputs for register submission');
//     }
//     try {
//         const saltRounds = 10;
//         const retrievedHash = await hash(password, saltRounds);
//         await db.transaction(async (trx) => {
//             const loginEmail = await trx.insert({
//                 hash: retrievedHash,
//                 email: email
//             })
//             .into('login')
//             .returning('email');
//             const user = await trx('users')
//                 .returning('*')
//                 .insert({
//                     email: loginEmail[0].email,
//                     name: name,
//                     joined: new Date()
//                 });
//             res.status(200).json(user[0]);
//         })
//     } catch (err) {
//         console.log(`\nRegistration error: ${err}\n`);
//         res.status(400).json({ error: `Unable to register: ${err}`});
//     }
// }
// Method 2: Using bcrypt.hash Promise-based method
const handleRegister = (req, res, db) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        res.status(400).json('invalid inputs for register submission');
    }
    const saltRounds = 10;
    (0, bcryptjs_1.hash)(password, saltRounds)
        .then((retrievedHash) => {
        db.transaction(async (trx) => {
            const loginEmail = await trx.insert({
                hash: retrievedHash,
                email: email
            })
                .into('login')
                .returning('email');
            const user = await trx('users')
                .returning('*')
                .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            });
            return res.status(200).json(user[0]);
        });
    })
        .catch((err) => {
        console.log(`\nError hash users' entered password: ${err}\n`);
        res.status(400).json({ error: `Unable to hash users' enter password to db. Failed to register: ${err}` });
    });
};
exports.handleRegister = handleRegister;
// Method 3 bcrypt hash sync code
// export const handleRegister = (req: Request, res: Response, db: Knex) => {
// Hashing the users' entered password
// const saltRounds = 10;
// const bcryptHash = hashSync(password, saltRounds);
// db.transaction((trx) => {
//     trx.insert({
//         hash: bcryptHash,
//         email: email
//     })
//     .into('login')
//     .returning('email')
//     .then((loginEmail) => {
//             console.log(`\nloginEmail interface:`);
//             console.log(loginEmail);
//             console.log(`\nloginEmail[0].email:`)
//             console.log(loginEmail[0].email)
//             return trx('users')
//             .returning('*')
//             .insert({
//                 email: loginEmail[0].email,
//                 name: name,
//                 joined: new Date()
//             })
//             .then(user => {
//                 res.json(user[0])
//             })
//     })
//     .then(trx.commit) // no error => commit transaction
//     // in case registration failed => rollback both 'login' && 'users' SQL transactions
//     .catch(trx.rollback) 
// })
// .catch((err: Error) => res.status(400).json(`unable to register\n${err}`));
// }
//# sourceMappingURL=register.js.map