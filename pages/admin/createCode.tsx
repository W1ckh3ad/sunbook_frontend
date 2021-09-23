import { Button, Snackbar, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Cookies from "cookies";
import { Formik } from "formik";
import { GetServerSideProps } from "next";
import React from "react";
import Alert from "src/components/Alert";
import { JwtModel, Voucher } from "src/models";
import parseJwt from "src/utils/parseJwt";
import axios from "src/utils/httpClient";
import * as yup from "yup";
import JsCookies from "js-cookie";

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const initValues: Voucher = {
    value: 15,
    description: "",
  };
  const validation = yup.object().shape({
    value: yup.number().positive().required().max(999).min(0).integer(),
    description: yup.string().required().min(3),
  });
  const jwt = JsCookies.get("jwt");
  const handleSubmit = async (values: Voucher) => {
    const res = await axios.post("admin/vouchers", values, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setCode(res.data.productCode);
    setOpen(true);
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
          Gutschrift erstellen
        </Typography>
        {code !== "" && <div>CODE: {code}</div>}
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
              sx={{
                mt: 3,
                display: "flex",
                gap: 2,
                flexDirection: "column",
                width: "clamp(90%, 500px, 40%)",
              }}
            >
              <TextField
                name="value"
                fullWidth
                id="value"
                label="Value (€)"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.value}
                helperText={errors.value}
                error={errors.value ? true : false}
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
              />
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
                multiline
              />
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Gutschrift erstellen
              </Button>
            </Box>
          )}
        </Formik>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Gutschein wurde erfolgreich dem Warenkorb hinzugefügt
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const jwt = cookies.get("jwt");

  const auth = parseJwt(jwt) as JwtModel;
  if (jwt === "" || jwt === undefined || auth.role !== "admin") {
    return {
      redirect: {
        destination: "/403",
        permanent: false,
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};
