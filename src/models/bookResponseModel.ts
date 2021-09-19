import { BookModel, UserModel } from "models";
import { UserDescription } from "./userDescription";

export type BookResponseModel = {
  sellers: (UserDescription & UserModel)[];
} & BookModel;
