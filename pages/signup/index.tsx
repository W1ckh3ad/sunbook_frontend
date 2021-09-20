import React from "react";
import {
  TextField,
  Box,
  Typography,
  Container,
  Button,
  Avatar,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { SignUpModel } from "src/models";
import { useRouter } from "next/router";
import axios from "src/utils/httpClient";
import Link from "src/components/Link";

export default function SignUp() {
  const router = useRouter();
  const initValues: SignUpModel = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    houseNum: "",
    plz: "",
    street: "",
  };
  const validation = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    city: yup.string().required(),
    houseNum: yup.string().matches(/\d.*/).required(),
    plz: yup.string().matches(/\d{5}/).required(),
    street: yup.string().required(),
  });

  const handleSubmit = async (values: SignUpModel) => {
    await axios.post("account/register", values);
    router.push({ pathname: "/signin" });
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
          Sign up
        </Typography>
        <Formik
          initialValues={initValues}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, handleSubmit }) => (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    helperText={errors.firstName}
                    error={errors.firstName ? true : false}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    helperText={errors.lastName}
                    error={errors.lastName ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="street"
                    name="street"
                    fullWidth
                    id="street"
                    label="Street"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.street}
                    helperText={errors.street}
                    error={errors.street ? true : false}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="houseNum"
                    label="House number"
                    name="houseNum"
                    autoComplete="houseNum"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.houseNum}
                    helperText={errors.houseNum}
                    error={errors.houseNum ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="plz"
                    label="PLZ"
                    name="plz"
                    autoComplete="plz"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.plz}
                    helperText={errors.plz}
                    error={errors.plz ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    helperText={errors.city}
                    error={errors.city ? true : false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="username"
                    autoComplete="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    helperText={errors.username}
                    error={errors.username ? true : false}
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
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
