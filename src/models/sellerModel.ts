import { BookResponseModel, UserModel } from "src/models";

export type SellerModel = {
  sellers: BookResponseModel[];
} & UserModel;
