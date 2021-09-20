import Head from "next/head";

import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Shoppingcard() {
  return (
    <>
      <Head>
        <title>Warenkorb</title>
      </Head>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Warenkorb
          </Typography>
        </Box>
      </Container>
    </>
  );
}
