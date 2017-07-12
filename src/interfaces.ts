export interface User {
    name: string;
    phone: string;
    email: string;
}

export interface Parking {
    id: string;
    serial: string;
    level: number;
    occupiedBy?: User;
    expires?: string;
}
