import { BookModel, UserDescription, UserModel } from "models";

export type SellerSingleModel = {
  books: (UserDescription & BookModel)[];
} & UserModel;
