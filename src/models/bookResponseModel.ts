import { BookModel, UserModel } from "src/models";
import { UserDescription } from "./userDescription";

export type BookResponseModel = {
  sellers: (UserDescription & { user: UserModel })[];
} & BookModel;
