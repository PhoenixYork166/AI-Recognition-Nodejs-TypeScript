export interface SignedInResponseInterface {
    id: number;
    name: string;
    email: string;
    entries: string;
    joined: string;
    raw_hex: string | null;
};