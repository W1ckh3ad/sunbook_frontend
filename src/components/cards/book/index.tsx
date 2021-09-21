import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardActions,
  IconButton,
  Button,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { createStyles, makeStyles } from "@mui/styles";
import { BookModel, UserDescription } from "src/models";
import React from "react";
import Link from "next/link";
import { useShoppingCart } from "src/hooks/useShoppingCart";

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
  }) => {
    const { addBook, shoppingCart } = useShoppingCart();
    const classes = useStyles();
    const [count, setCount] = React.useState(0);
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
            <Button type="button" onClick={() => addBook(uid, sellerId)}>
              In den Warenkorb ({count})
            </Button>
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
