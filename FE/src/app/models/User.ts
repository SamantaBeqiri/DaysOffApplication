import { Application } from './Application';

export interface User{
    
    id?: number;
    name?: string;
    surname?: string;
    username?: string;
    password?: string;
    role?: 'ROLE_USER' | 'ROLE_ADMIN';
    applications?: Application[];
    daysNo?: number;

}