import { LoginResponseProperties } from "./LoginResponseProperties.interface";

export interface UserResponseInterface<T extends LoginResponseProperties> {
    id: number;
    name: string;
    email: string;
    entries: string;
    joined: string;
    raw_hex: string | null;
    hash: T['hash'];
};