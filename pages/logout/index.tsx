import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  React.useEffect(() => {
    Cookies.remove("jwt");
    router.push("/signin");
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Logout
        </Typography>
      </Box>
    </Container>
  );
}
