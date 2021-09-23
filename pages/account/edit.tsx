import Head from "next/head";
import { GetServerSideProps } from "next";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Cookies from "cookies";
import axios from "src/utils/httpClient";
import * as yup from "yup";
import { UserModel } from "src/models";
import JsCookies from "js-cookie";
import { Formik, Form } from "formik";
import { Button, TextField } from "@mui/material";

const validation = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  city: yup.string().required(),
  houseNum: yup.string().matches(/\d.*/).required(),
  plz: yup.string().matches(/\d{5}/).required(),
  street: yup.string().required(),
});

const AccountEdit: React.VFC<UserModel> = ({
  city,
  email,
  firstName,
  houseNum,
  lastName,
  plz,
  shopName,
  street,
}) => {
  const init = {
    city,
    email,
    firstName,
    houseNum,
    lastName,
    plz,
    shopName,
    street,
  };
  const jwt = JsCookies.get("jwt");
  const onSubmit = async (values: typeof init) => {
    await axios.patch("account", values, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  };
  return (
    <>
      <Head>
        <title>Profil</title>
      </Head>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profil
          </Typography>
          <Formik
            initialValues={init}
            onSubmit={onSubmit}
            validationSchema={validation}
          >
            {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                }}
              >
                <TextField
                  label="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                  value={values.email}
                  name="email"
                />
                <TextField
                  label="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName}
                  value={values.firstName}
                  name="firstName"
                />
                <TextField
                  label="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName}
                  value={values.lastName}
                  name="lastName"
                />
                <TextField
                  label="shopName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.shopName ? true : false}
                  helperText={errors.shopName}
                  value={values.shopName}
                  name="shopName"
                />
                <TextField
                  label="street"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.street ? true : false}
                  helperText={errors.street}
                  value={values.street}
                  name="street"
                />
                <TextField
                  label="houseNum"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.houseNum ? true : false}
                  helperText={errors.houseNum}
                  value={values.houseNum}
                  name="houseNum"
                />
                <TextField
                  label="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.city ? true : false}
                  helperText={errors.city}
                  value={values.city}
                  name="city"
                />
                <TextField
                  label="plz"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.plz ? true : false}
                  helperText={errors.plz}
                  value={values.plz}
                  name="plz"
                />
                <Button disabled={isSubmitting} type="submit">
                  "Änderungen speichern"
                </Button>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </>
  );
};
export default AccountEdit;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const jwt = cookies.get("jwt");
  if (jwt === "" || jwt === undefined) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
      props: {},
    };
  }
  const { data: user } = await axios.get("account", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: { ...user },
  };
};
