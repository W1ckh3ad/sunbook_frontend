import { useLocalStorage } from "./useStorage";

export const useShopingCard = useLocalStorage<{
  books: { sellerId: number; bookId: number }[];
  vouchers: {
    value: number;
    description: string;
    receiverId: number;
    receiverMail: string;
  }[];
}>("shopping-cart", { books: [], vouchers: [] });
