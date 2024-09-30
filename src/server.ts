import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';
import { handleRoot} from './controllers/root';
import { handleRegister } from './controllers/register';
import { handleSignin } from './controllers/signin';
import { handleProfileGet } from './controllers/profile';
import { handleCelebrityApi, handleColorApi, handleAgeApi, handleImage } from './controllers/image';
import fetch from 'node-fetch';

import dotenv from 'dotenv';
dotenv.config();

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
const db = knex({
 client: 'pg',
 connection: {
     host: '127.0.0.1',
     user: 'postgres',
     password: 'test',
     database: 'smart-brain'
}
})

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
})

// Logging whether connection to PostgreSQL on Render.com is successful
db.raw("SELECT 1")
.then(() => {
    console.log(`\nPostgreSQL connected!!\n`);
})
.catch(err => {
    console.log(`\nPostgreSQL not connected\nErrors: ${err}\n`);
});

// Using Express middleware
const app = express(); 

// Will need either app.use(express.json()) || app.use(bodyParser.json())
// to parse json 
app.use(express.json()); 

// Using CORS modules to allow fetching from other domains
app.use(cors());

// create a basic route for root
app.get('/', (req, res) => { handleRoot(req, res, db) } )

// create /signin route
app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) });

// create /register route
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) } )

// create /profile/:id route
// grab via req..params props
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) } )

// create /image
// increase entries
app.put('/image', (req, res) => { handleImage(req, res, db) } )
app.post('/celebrityimage', (req, res) => { handleCelebrityApi(req, res, fetch) } )
app.post('/colorimage', (req, res) => { handleColorApi(req, res, fetch) } )
app.post('/ageimage', (req, res) => { handleAgeApi(req, res, fetch) } )

// app.listen(port, fn)
// fn will run right after listening to a port
const port = process.env.PORT || 3000;
// const DATABASE_URL = process.env.DATABASE_URL
app.listen(port, () => {
    console.log(`\nNode app is up & running on port: ${port}\n`);
})
