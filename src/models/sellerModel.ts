import { BookResponseModel, UserModel } from "models";

export type SellerModel = {
  sellers: BookResponseModel[];
} & UserModel;
