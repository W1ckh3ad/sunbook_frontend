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
import { ExtraProduct } from "src/models/extraProduct";

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

const VoucherCard: React.VFC<ExtraProduct> = ({
  createdAt,
  creator,
  id,
  price,
  productCode,
  productDescription,
  productName,
  receiver,
  usedAt,
  usedIn,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.container} variant="outlined">
      <CardHeader title={productName} subheader={productCode} />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {createdAt} | {creator} | {id} | {price}€
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          {productDescription}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          {receiver} | {usedAt} | {usedIn}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VoucherCard;
