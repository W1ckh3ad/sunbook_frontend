import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Formik } from "formik";
import { SignInModel } from "src/models";
import Link from "src/components/Link";
import * as yup from "yup";
import { useRouter } from "next/router";
import axios from "src/utils/httpClient";

export default function SignIn() {
  const router = useRouter();
  const initValues: SignInModel = {
    username: "christopher.gdynia@edu.fhdw.de",
    password: "12345678",
  };
  const validation = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().required(),
  });

  const handleSubmit = async (values: SignInModel) => {
    const { jwt } = (await axios.post("account/authenticate", values)).data;
    const date = new Date(new Date().getTime() + 1000 * 60 * 60 * 10);
    document.cookie = `jwt=${jwt}; expires=${date.toUTCString()}; path=/`;
    router.push({ pathname: "/" });
  };

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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={initValues}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                mt: 1,
                gap: 1,
                display: "flex",
                flexDirection: "column",
                width: "clamp(90%, 300px, 40%)",
              }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="username"
                value={values.username}
                error={errors.username ? true : false}
                helperText={errors.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                margin="normal"
                fullWidth
                id="password"
                label="Passwort"
                name="password"
                type="password"
                value={values.password}
                error={errors.password ? true : false}
                helperText={errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
