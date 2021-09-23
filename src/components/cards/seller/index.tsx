import { ChevronRight } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Snackbar,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Link from "next/link";
import React from "react";
import { useShoppingCart } from "src/hooks/useShoppingCart";
import { UserDescription, UserModel } from "src/models";
import Alert from "src/components/Alert";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: "1rem",
      minWidth: 275,
    },
    actions: {
      justifyContent: "flex-end",
    },
  })
);

const SellerCard: React.VFC<
  UserDescription & {
    user: UserModel;
    book: {
      uid: number;
      author: string;
      isbn: string;
      description: string;
      title: string;
      price: number;
    };
  }
> = ({ userDescription, user, book }) => {
  const {
    userId,
    city,
    street,
    plz,
    email,
    houseNum,
    firstName,
    lastName,
    shopName,
  } = user;
  const { addBook, shoppingCart } = useShoppingCart();
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setCount(
      shoppingCart.books.filter(
        (current) => current.bookId === book.uid && current.sellerId === userId
      ).length
    );
  }, []);
  React.useEffect(() => {
    setCount(
      shoppingCart.books.filter(
        (current) => current.bookId === book.uid && current.sellerId === userId
      ).length
    );
  }, [shoppingCart]);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Card className={classes.container} variant="outlined">
      <CardHeader title={shopName} subheader={lastName + ", " + firstName} />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          <address>
            {email} <br />
            {street} {houseNum} <br />
            {plz} {city}
          </address>
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          {userDescription}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          type="button"
          onClick={() => {
            setOpen(true);
            addBook(
              book.uid,
              userId,
              book.title,
              book.description,
              book.author,
              book.isbn,
              book.price
            );
          }}
        >
          In den Warenkorb ({count})
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Item '{book.title}' added to shopping cart ({count})
          </Alert>
        </Snackbar>
        <Link href={`/seller/${userId}`} passHref>
          <IconButton component="a" aria-label="Zum Verkäufer">
            <ChevronRight />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
};

export default SellerCard;
