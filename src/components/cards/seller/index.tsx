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
import { UserDescription, UserModel } from "src/models";
import React from "react";
import Link from "next/link";

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

const SellerCard: React.VFC<UserDescription & { user: UserModel }> = ({
  userDescription,
  user,
}) => {
  const classes = useStyles();
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
        <Button type="button">In den Warenkorb</Button>
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
