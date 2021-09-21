import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Formik } from "formik";
import * as yup from "yup";
import { Voucher } from "src/models";
import { useRouter } from "next/router";
import { Grid, TextField, Button } from "@mui/material";
import axios from "src/utils/httpClient";

export default function SignUp() {
  const router = useRouter();
  const initValues: Voucher = {
    value: 15,
    description: "",
  };
  const validation = yup.object().shape({
    value: yup.number().positive().required().max(999).min(0).integer(),
    description: yup.string(),
  });

  const handleSubmit = async (values: Voucher) => {
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
                    name="value"
                    fullWidth
                    id="value"
                    label="Value"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.value}
                    helperText={errors.value}
                    error={errors.value ? true : false}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="description"
                    label="Beschreibung"
                    name="description"
                    autoComplete="lname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    helperText={errors.description}
                    error={errors.description ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="receiverMail"
                    fullWidth
                    id="receiverMail"
                    label="ReceiverMail"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.receiverMail}
                    helperText={errors.receiverMail}
                    error={errors.receiverMail ? true : false}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="receiverId"
                    label="Receiver Id"
                    name="receiverId"
                    type="number"
                    autoComplete="receiverId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.receiverId}
                    helperText={errors.receiverId}
                    error={errors.receiverId ? true : false}
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
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
