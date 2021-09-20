import { SignInModel } from "src/models";

export type SignUpModel = {
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  plz: string;
  houseNum: string;
} & SignInModel;
