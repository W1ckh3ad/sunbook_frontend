import { ShoppingCart, Voucher } from "src/models";
import { useLocalStorage } from "./useStorage";

export const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useLocalStorage<ShoppingCart>(
    "shopping-cart",
    { books: [], vouchers: [] }
  );

  const addBook = (bookId: number, sellerId: number,  description: string, author: string, isbn: string) => {
    setShoppingCart((oldState: ShoppingCart) => ({
      ...oldState,
      books: [...oldState.books, { bookId, sellerId, description, author, isbn }],
    }));
  };
  const addVoucher = (voucher: Voucher) => {
    setShoppingCart((oldState: ShoppingCart) => ({
      ...oldState,
      vouchers: [...oldState.vouchers, voucher],
    }));
  };

  const removeBook = (index: number) => {
    setShoppingCart((oldState: ShoppingCart) => {
      const books = [...oldState.books];
      books.splice(index, 1);
      return {
        ...oldState,
        books,
      };
    });
  };

  const removeVoucher = (index: number) => {
    setShoppingCart((oldState: ShoppingCart) => {
      const vouchers = [...oldState.vouchers];
      vouchers.splice(index, 1);
      return {
        ...oldState,
        vouchers,
      };
    });
  };

  return {
    shoppingCart,
    addBook,
    addVoucher,
    removeBook,
    removeVoucher,
  };
};
