export type ExtraProduct = {
  id: number;
  productName: string;
  productCode: string;
  creator: number;
  createdAt: Date;
  receiver?: number;
  price: number;
  usedIn?: number;
  usedAt?: Date;
  productDescription: string;
};
