import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Formik } from "formik";
import * as yup from "yup";
import { Voucher } from "src/models";
import { TextField, Button, Snackbar } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { useShoppingCart } from "src/hooks/useShoppingCart";
import Link from "src/components/Link";
import Alert from "src/components/Alert";

export default function SignUp() {
  const { addVoucher } = useShoppingCart();
  const [open, setOpen] = React.useState(false);
  const initValues: Voucher = {
    value: 15,
    description: "",
  };
  const validation = yup.object().shape({
    value: yup.number().positive().required().max(999).min(0).integer(),
    description: yup.string().required().min(3),
  });

  const handleSubmit = async (values: Voucher) => {
    setOpen(true);
    addVoucher({ ...values });
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
          Gutschein erstellen
        </Typography>
        <Link href="/shoppingcart">Zum Warenkorb</Link>
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
                label="Value (???)"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.value}
                helperText={errors.value}
                error={errors.value ? true : false}
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">???</InputAdornment>
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
                In den Warenkorb
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
            Gutschein wurde erfolgreich dem Warenkorb hinzugef??gt
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
