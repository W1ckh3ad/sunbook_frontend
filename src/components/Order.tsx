import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { OrderModel } from "src/models/orderModel";
import BookCard from "./cards/book";
import VoucherCard from "./cards/voucher";

const Order: React.VFC<{ order?: OrderModel }> = ({ order }) => {
  return (
    <>
      {order && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography component="h2" variant="h5">
            Fertige Bestellung User({order.userId})
          </Typography>
          <div>
            {order.id} | {order.createdAt}{" "}
          </div>
          {order &&
            order.books &&
            order.books.map((x, i) => <BookCard {...x} key={x.uid + "" + i} />)}

          {order &&
            order.codes &&
            order.codes.map((x) => <VoucherCard {...x} key={x.id} />)}
        </Box>
      )}
    </>
  );
};

export default Order;
