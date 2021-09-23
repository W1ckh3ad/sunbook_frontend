import { ShoppingCart, Voucher } from "src/models";
import { useLocalStorage } from "./useStorage";
import { useCallback } from "react";

export const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useLocalStorage<ShoppingCart>(
    "shopping-cart",
    { books: [], vouchers: [] }
  );

  const addBook = useCallback(
    (
      bookId: number,
      sellerId: number,
      title: string,
      description: string,
      author: string,
      isbn: string,
      price: number
    ) => {
      setShoppingCart((oldState: ShoppingCart) => ({
        ...oldState,
        books: [
          ...oldState.books,
          { bookId, sellerId, title, description, author, isbn, price },
        ],
      }));
    },
    [setShoppingCart]
  );
  const addVoucher = useCallback(
    (voucher: Voucher) => {
      setShoppingCart((oldState: ShoppingCart) => ({
        ...oldState,
        vouchers: [...oldState.vouchers, voucher],
      }));
    },
    [setShoppingCart]
  );

  const removeBook = useCallback(
    (index: number) => {
      setShoppingCart((oldState: ShoppingCart) => {
        const books = [...oldState.books];
        books.splice(index, 1);
        return {
          ...oldState,
          books,
        };
      });
    },
    [setShoppingCart]
  );

  const removeVoucher = useCallback(
    (index: number) => {
      setShoppingCart((oldState: ShoppingCart) => {
        const vouchers = [...oldState.vouchers];
        vouchers.splice(index, 1);
        return {
          ...oldState,
          vouchers,
        };
      });
    },
    [setShoppingCart]
  );

  const reset = useCallback(
    () => setShoppingCart({ books: [], vouchers: [] }),
    [setShoppingCart]
  );

  return {
    shoppingCart,
    addBook,
    addVoucher,
    removeBook,
    removeVoucher,
    reset,
  };
};
