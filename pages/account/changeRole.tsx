import Head from "next/head";
import { GetServerSideProps } from "next";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Cookies from "cookies";
import axios from "src/utils/httpClient";
import { UserModel } from "src/models";
import JsCookies from "js-cookie";
import { Formik, Form } from "formik";
import { Button, TextField } from "@mui/material";

const ChangeRole: React.VFC<UserModel> = ({ role }) => {
  const init = {
    role,
  };
  const jwt = JsCookies.get("jwt");
  const onSubmit = async (values: typeof init) => {
    await axios.patch("account/changeRole", values, {
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
          <Formik initialValues={init} onSubmit={onSubmit}>
            {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                }}
              >
                <TextField
                  label="role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.role ? true : false}
                  helperText={errors.role}
                  value={values.role}
                  name="role"
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
export default ChangeRole;

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
