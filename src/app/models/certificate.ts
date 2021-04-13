export interface Certificate {
    id?: number;
    name: string;
    description: string;
    price: string;
    creationDate?: Date;
    modificationDate?: Date;
    tags: Array<string>;
    creatorId: number;
    developerId?: number;
    desiredDevelopers: [];
}

export enum CertificateStatus {
    PUBLISHED,
    ACTIVE,
    INACTIVE
}
