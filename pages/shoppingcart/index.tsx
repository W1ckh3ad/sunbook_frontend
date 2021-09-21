import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useShoppingCart } from "src/hooks/useShoppingCart";

export default function ShoppingCart() {
  const { shoppingCart, addBook, addVoucher, removeBook, removeVoucher } =
    useShoppingCart();
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Shopping Cart
        </Typography>
        <Box>{}</Box>
        <Box>
          {shoppingCart.vouchers.map((x, i) => (
            <div key={i}>Value: {x.value} | Description: {x.description} | For: {x.receiverMail ?? x.receiverId} </div>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
