import { Request, Response } from 'express';
import { Knex } from 'knex';
import { LoginResponseProperties } from '../interfaces/LoginResponseProperties.interface';

// create / route
export const handleRoot = (req: Request, res: Response, db: Knex) => {
    const query = `SELECT * FROM users JOIN login ON users.email = login.email`;

    db
    .select('*')
    .from('users')
    .join('login', function() {
        this
            .on('users.email', '=', 'login.email')
            .orOn('users.id', '=', 'login.id')
    })
    .then((response: LoginResponseProperties[]) => {
        if (response) {
            res.status(200).json(response);
        } else {
            console.log(`\nError to run SQL: ${query}\n`);
            res.status(400).json({ error: 'Cannot fetch database' } );
        }
    })
    .catch((err: Error) => {
        console.log(err);
        res.status(400).json(err);
    })
};
