"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
console.log(`rootDir/controllers/signin.ts:`);
console.log(bcryptjs_1.default);
// create /signin route
const handleSignin = (req, res, db, bcrypt) => {
    const requestHandlerName = `handleSignIn`;
    // bcrypt.compare("apples", '$2a$10$2J9/8JWebKrnUW8CCntOzurNR1646g/1erL4QsEMuETelwdHhs6jG', function(err, res) {
    //     console.log('first guess', res)
    // });
    // bcrypt.compare("veggies", '$2a$10$2J9/8JWebKrnUW8CCntOzurNR1646g/1erL4QsEMuETelwdHhs6jG', function(err, res) {
    //     console.log('second guess', res)
    // });
    // console.log('req.body: \n', req.body);
    const { email, password } = req.body;
    // Server-side validations
    // If there're no req.body.email OR req.body.password
    if (!email || !password) {
        return res.status(403).json({
            error: 'Invalid inputs for signin form submission'
        });
    }
    db('users')
        .select('email', 'hash')
        .where('email', '=', email)
        .from('login')
        .then((response) => {
        // console.log(`/signin\nresponse[0].email: ${response[0].email} \nresponse[0].hash: ${response[0].hash}`)
        console.log(`${requestHandlerName} response:`);
        console.log(response);
        // Comparing users' password input from req.body.password
        // to server-side fetched json
        const user = response[0];
        // const isValid: boolean = bcrypt.compareSync(password, user.hash, (err, result) => {
        bcrypt.compare(password, user.hash, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Password Encryption failed' });
            }
            if (result) {
                db.select('*')
                    .from('users')
                    .where('email', '=', email)
                    .then(user => {
                    if (user) {
                        return res.status(200).json(user[0]);
                    }
                    else {
                        return res.status(404).json({ error: 'user not found' });
                    }
                });
            }
            else {
                res.status(400).json({ error: 'Invalid crendentials' });
            }
        });
        /* bcrypt.compareSync()
        // If they match up
        if (isValid) {
            // return SELECT * FROM users WHERE email = req.body.email;
            // Will give a user json object
            db.select('*')
            .from('users')
            .where('email', '=', email)
            .then(user => {
                if (user) {
                    return res.status(200).json(user[0]);
                } else {
                    return res.status(404).json({ error: 'user not found' });
                }
            })
            .catch((err: Error) => {
                console.log(`\nError loging in: ${err}\n`);
                res.status(400).json({ error: 'login failed' })
            })
        } else {
            res.status(400).json({ error: 'login failed, incorrect credentials' });
        }
        */
    })
        .catch((err) => {
        console.log(`\nError loging in: ${err}\n`);
        res.status(400).json({ error: 'login failed' });
    });
};
exports.handleSignin = handleSignin;
//# sourceMappingURL=signin.js.map