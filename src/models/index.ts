export type { BookModel } from "./bookModel";
export type { BookResponseModel } from "./bookResponseModel";
export type { UserModel } from "./userModel";
export type { BookQueryModel } from "./bookQueryModel";
export type { SellerModel } from "./sellerModel";
export type { SellerSingleModel } from "./sellerSingleModel";
export type { UserDescription } from "./userDescription";
export type { SignInModel } from "./signInModel";
export type { SignUpModel } from "./signUpModel";
export type { JwtModel } from "./jwtModel";

export type Voucher = {
  value: number;
  description: string;
  receiverId?: number;
  receiverMail?: string;
};
export type ShoppingCart = {
  books: {
    sellerId: number;
    bookId: number;
    description: string;
    author: string;
    isbn: string;
  }[];
  vouchers: Voucher[];
};
