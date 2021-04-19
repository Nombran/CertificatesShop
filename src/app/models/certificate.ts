import {User} from './user';

export interface Certificate {
    id?: number;
    name: string;
    description: string;
    price: string;
    status: string;
    creationDate?: Date;
    modificationDate?: Date;
    tags: Array<string>;
    creatorId: number;
    developer?: User;
    desiredDevelopers?: Array<User>;
}

export enum CertificateStatus {
    PUBLISHED,
    ACTIVE,
    INACTIVE
}
