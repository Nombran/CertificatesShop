export interface Certificate {
    id?: number;
    name: string;
    description: string;
    price: number;
    creationDate?: Date;
    modificationDate?: Date;
    duration: number;
    status: string;
    count?: number;
    tags: Array<string>;
}

export enum CertificateStatus {
    PUBLISHED, 
    ACTIVE,
    INACTIVE
}