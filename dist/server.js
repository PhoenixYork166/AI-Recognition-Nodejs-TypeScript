"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = __importDefault(require("knex"));
const root_1 = require("./controllers/root");
const register_1 = require("./controllers/register");
const signin_1 = require("./controllers/signin");
const profile_1 = require("./controllers/profile");
const image_1 = require("./controllers/image");
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/* Connecting to PostgreSQL DB hosted on Render.com */
// const db = knex({
//     client: 'pg',
//     connection: {
//         host: `${process.env.POSTGRESQL_HOST}`,
//         user: `${process.env.POSTGRESQL_USER}`,
//         password: `${process.env.POSTGRESQL_PASSWORD}`,
//         database: `${process.env.POSTGRESQL_DATABASE}`
//     }
// });
console.log(`\nprocess.env.POSTGRESQL_HOST:\n${process.env.POSTGRESQL_HOST}\n\nprocess.env.POSTGRESQL_USER:\n${process.env.POSTGRESQL_USER}\n\nprocess.env.POSTGRESQL_PASSWORD:\n${process.env.POSTGRESQL_PASSWORD}\n\nprocess.env.POSTGRESQL_DATABASE:\n${process.env.POSTGRESQL_DATABASE}\n`);
// Connecting to local dev server & dev db postgreSQL 
const db = (0, knex_1.default)({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});
// Describing table named 'users' on our local dev server
db.select('*').from('pg_stat_activity')
    .then((dbConnection) => {
    // console.log(`PostgreSQL dbConnection:\n`);
    // console.log(dbConnection);
    // console.log(`\n`);
    // Mapping connection json to display connected database name
    const databaseName = dbConnection.filter(item => item.datname === 'smart-brain');
    console.log(`\nConnected Database Information:\n`);
    // console.log(databaseName);
})
    .catch(err => {
    console.log(`\nError verifying PostgreSQL connection:\n${err}\n`);
});
// Logging whether connection to PostgreSQL on Render.com is successful
db.raw("SELECT 1")
    .then(() => {
    console.log(`\nPostgreSQL connected!!\n`);
})
    .catch(err => {
    console.log(`\nPostgreSQL not connected\nErrors: ${err}\n`);
});
// Using Express middleware
const app = (0, express_1.default)();
// Will need either app.use(express.json()) || app.use(bodyParser.json())
// to parse json 
app.use(express_1.default.json());
// Using CORS modules to allow fetching from other domains
app.use((0, cors_1.default)());
// create a basic route for root
app.get('/', (req, res) => { (0, root_1.handleRoot)(req, res, db); });
// create /signin route
app.post('/signin', (req, res) => { (0, signin_1.handleSignin)(req, res, db, bcryptjs_1.default); });
// create /register route
app.post('/register', (req, res) => { (0, register_1.handleRegister)(req, res, db, bcryptjs_1.default); });
// create /profile/:id route
// grab via req..params props
app.get('/profile/:id', (req, res) => { (0, profile_1.handleProfileGet)(req, res, db); });
// create /image
// increase entries
app.put('/image', (req, res) => { (0, image_1.handleImage)(req, res, db); });
app.post('/celebrityimage', (req, res) => { (0, image_1.handleCelebrityApi)(req, res, node_fetch_1.default); });
app.post('/colorimage', (req, res) => { (0, image_1.handleColorApi)(req, res, node_fetch_1.default); });
app.post('/ageimage', (req, res) => { (0, image_1.handleAgeApi)(req, res, node_fetch_1.default); });
// app.listen(port, fn)
// fn will run right after listening to a port
const port = process.env.PORT || 3000;
// const DATABASE_URL = process.env.DATABASE_URL
app.listen(port, () => {
    console.log(`\nNode app is up & running on port: ${port}\n`);
});
//# sourceMappingURL=server.js.map