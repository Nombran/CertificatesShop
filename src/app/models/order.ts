export interface Order {
    id?:number;
    certificatesIds: number[];
    purchaseDate?:Date;
    totalPrice?:number;
    userId?: number;
}