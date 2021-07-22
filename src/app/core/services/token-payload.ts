export interface TokenPayLoad {
    sub: string;
    roles: Array<string>;
    iat: number;
    exp: number;
}