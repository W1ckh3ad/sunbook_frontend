import { BookModel, UserDescription, UserModel } from "src/models";

export type SellerSingleModel = {
  sellers: (UserDescription & BookModel)[];
} & UserModel;
