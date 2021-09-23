import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useShoppingCart } from "src/hooks/useShoppingCart";
import {
  Button,
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from "@mui/material";
import Link from "src/components/Link";
import { Add, Close, Remove } from "@mui/icons-material";
import httpClient from "src/utils/httpClient";
import Cookies from "js-cookie";
import Alert from "src/components/Alert";
import { useRouter } from "next/router";
import { Voucher } from "src/models";
import axios from "src/utils/httpClient";
import { OrderModel } from "src/models/orderModel";
import Order from "src/components/Order";

export default function ShoppingCart() {
  const { shoppingCart, addBook, removeBook, removeVoucher, reset } =
    useShoppingCart();
  const [paymentMethod, setPaymentMethod] = React.useState("creditcard");
  const [code, setCode] = React.useState("");
  const [disableAddCode, setDisabledAddCode] = React.useState(false);
  const [disableOrder, setDisabledOrder] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState<OrderModel | undefined>(undefined);
  const [paymentCodes, setPaymentCodes] = React.useState<
    { code: string; price: number }[]
  >([]);
  const [jwt, setJwt] = React.useState("");
  const router = useRouter();
  const handleChange = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value as string);
  };

  const books = React.useMemo(() => {
    const data: {
      bookId: number;
      sellerId: number;
      title: string;
      description: string;
      author: string;
      isbn: string;
      price: number;
      indexes: number[];
    }[] = [];
    for (let i = 0; i < shoppingCart.books.length; i++) {
      const book = shoppingCart.books[i];
      const index = data.findIndex(
        (x) => x.bookId === book.bookId && x.sellerId === book.sellerId
      );
      if (index > -1) {
        data[index].indexes = [...data[index].indexes, i];
      } else {
        data.push({ ...book, indexes: [i] });
      }
    }
    return data;
  }, [shoppingCart]);

  const total = React.useMemo(() => {
    let total = 0;
    for (const book of books) {
      total += book.price * book.indexes.length;
    }
    for (const voucher of shoppingCart.vouchers) {
      total += voucher.value;
    }
    for (const code of paymentCodes) {
      total -= code.price;
    }
    return total;
  }, [books, shoppingCart, paymentCodes]);

  React.useEffect(() => {
    const jwt = Cookies.get("jwt");
    jwt && setJwt(jwt);
  }, []);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleAddPaymentCode = React.useCallback(async () => {
    setDisabledAddCode(true);
    if (jwt === "") {
      return router.push("/signin");
    }

    if (paymentCodes.find((x) => x.code === code)) {
      setDisabledAddCode(false);
      setCode("");
      setOpen(true);
      return;
    }
    try {
      const res = await httpClient.get("orders/validateVoucher?code=" + code, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (res.status !== 200) {
        setOpen(true);
        return;
      }
      if (total - res.data.price < 0) {
        setOpen(true);
        return;
      }
      setPaymentCodes((codes) => [...codes, { code, price: res.data.price }]);
      setCode("");
    } catch (e) {
      setOpen(true);
      return;
    }

    setDisabledAddCode(false);
  }, [code, jwt, total]);
  const handleSubmit = React.useCallback(async () => {
    if (jwt === "") {
      return router.push("/signin");
    }
    setDisabledOrder(true);
    if (total < 0) {
      return;
    }
    const data: {
      books: { bookId: number; sellerId: number }[];
      vouchers: Voucher[];
      usedCodes: string[];
    } = {
      books: shoppingCart.books.map(({ bookId, sellerId }) => ({
        bookId,
        sellerId,
      })),
      vouchers: [...shoppingCart.vouchers],
      usedCodes: paymentCodes.map((x) => x.code),
    };

    const res = await axios.post("orders", data, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (res.status !== 200) {
      setDisabledOrder(false);
      return;
    }
    setOrder(res.data);
    reset();
    setCode("");
    setPaymentCodes([]);
    setDisabledOrder(false);
  }, [shoppingCart, paymentCodes, jwt, total]);
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shopping Cart
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
          <Typography component="h2" variant="h5">
            Bücher
          </Typography>
          {jwt == "" && (
            <Link href="/signin">
              For completing your order you need to login
            </Link>
          )}
          {books.map(
            ({
              bookId,
              author,
              description,
              indexes,
              isbn,
              price,
              sellerId,
              title,
            }) => (
              <Card
                sx={{ p: 2, display: "flex", gap: 2, flexDirection: "column" }}
                key={bookId + "_" + sellerId}
              >
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  {title}
                </Typography>
                <div>{title}</div>
                <div>
                  {description.length > 100
                    ? description.slice(0, 100) + "..."
                    : description}
                </div>
                <div>
                  {isbn} | {author} | {price}€
                </div>
                <Link href={`/books/${bookId}`}>Zum Buch</Link>
                <Link href={`/seller/${sellerId}`}>Zum Verkäufer</Link>
                <div>
                  <IconButton
                    onClick={() => removeBook(indexes[indexes.length - 1])}
                  >
                    <Remove />
                  </IconButton>
                  {price * indexes.length}€ ({indexes.length}x)
                  <IconButton
                    onClick={() =>
                      addBook(
                        bookId,
                        sellerId,
                        title,
                        description,
                        author,
                        isbn,
                        price
                      )
                    }
                  >
                    <Add />
                  </IconButton>
                </div>
              </Card>
            )
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography component="h2" variant="h5">
            Gutscheine
          </Typography>
          {shoppingCart.vouchers.map((x, i) => (
            <Card sx={{ p: 2 }} key={i}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Gutschein
                </Typography>
                <IconButton onClick={() => removeVoucher(i)}>
                  <Close />
                </IconButton>
              </Box>
              Value: {x.value} | Description: {x.description}{" "}
              {(x.receiverId || x.receiverMail) && (
                <>| For: {x.receiverMail ?? x.receiverId} </>
              )}
            </Card>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography component="h2" variant="h5">
            Verwendete Gutscheine
          </Typography>
          {paymentCodes.map((x, i) => (
            <Card sx={{ p: 2, display: "flex", alignItems: "center" }} key={i}>
              {x.code} | {x.price}€{" "}
              <IconButton
                sx={{ ml: "auto" }}
                onClick={() => {
                  setPaymentCodes((codes) => {
                    codes.splice(i, 1);
                    return codes;
                  });
                }}
              >
                <Close />
              </IconButton>
            </Card>
          ))}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              fullWidth
              label="Gutscheincode eingeben"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              fullWidth
              variant="outlined"
              onClick={handleAddPaymentCode}
              disabled={disableAddCode}
            >
              Add Code
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Code isn't valid (Invalid| already used (in this order)|total
                can't go below 0)
              </Alert>
            </Snackbar>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography component="h2" variant="h5">
            Zahlungsmethode
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Zahlungsmethode
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paymentMethod}
              label="Zahlungsmethode"
              onChange={handleChange}
            >
              <MenuItem value="vorkasse">Vorkasse</MenuItem>
              <MenuItem value="paypal">Paypal</MenuItem>
              <MenuItem value="creditcard">CreditCard</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>Gesamt: {total}€</Box>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={disableOrder}
        >
          Kaufen
        </Button>
        <Order order={order} />
      </Box>
    </Container>
  );
}
