export interface Certificate {
    id?: number;
    name: string;
    description: string;
    price: number;
    creationDate?: Date;
    modificationDate?: Date;
    duration: number;
    status: string
    tags: Array<string>
}

export enum CertificateStatus {
    PUBLISHED, 
    ACTIVE,
    INACTIVE
}