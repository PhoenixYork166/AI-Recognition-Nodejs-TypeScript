import { Request } from 'express';

export interface SignInRequest extends Request {
    body: {
        email: string;
        password: string;
    }
}