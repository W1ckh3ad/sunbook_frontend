import { BookResponseModel } from ".";
import { ExtraProduct } from "./extraProduct";

export type OrderModel = {
  id: number;
  userId: number;
  value: number;
  paymentMethod: string;
  createdAt: Date;
  books?: BookResponseModel[];
  codes?: ExtraProduct[];
  usedCodes?: string[];
};
