import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  IconButton,
  Button,
  Snackbar,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { createStyles, makeStyles } from "@mui/styles";
import { BookModel, UserDescription } from "src/models";
import React from "react";
import Link from "next/link";
import { useShoppingCart } from "src/hooks/useShoppingCart";
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

const BookCard: React.VFC<BookModel & UserDescription & { sellerId?: number }> =
  ({
    author,
    binding,
    genre,
    isbn,
    language,
    price,
    publisher,
    title,
    uid,
    sellerId,
    description,
  }) => {
    const { addBook, shoppingCart } = useShoppingCart();
    const classes = useStyles();
    const [count, setCount] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
      setCount(
        shoppingCart.books.filter(
          (current) => current.bookId === uid && current.sellerId === sellerId
        ).length
      );
    }, []);
    React.useEffect(() => {
      setCount(
        shoppingCart.books.filter(
          (current) => current.bookId === uid && current.sellerId === sellerId
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
        <CardHeader title={title} subheader={author} />
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            ISBN: {isbn} | {genre}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            Preis: {price} € | {binding} | {language} | {publisher}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          {sellerId && (
            <>
              <Button
                type="button"
                onClick={() => {
                  setOpen(true);
                  addBook(uid, sellerId, title, description, author, isbn, price);
                }}
              >
                In den Warenkorb ({count})
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Item '{title}' added to shopping cart ({count})
                </Alert>
              </Snackbar>
            </>
          )}
          <Link href={`/books/${uid}`} passHref>
            <IconButton component="a" aria-label="Zur Produktseite">
              <ChevronRight />
            </IconButton>
          </Link>
        </CardActions>
      </Card>
    );
  };

export default BookCard;
