import { User } from './User';

export interface Application {
    id?:string,
    startDate?:Date,
    endDate?:Date,
    status?:'PENDING' | 'CONFIRMED' | 'REJECTED';
    requestedBy?
    : User;
}

