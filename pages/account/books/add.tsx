import Cookies from "cookies";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { UserModel } from "src/models";
import axios from "src/utils/httpClient";
import JsCookies from "js-cookie";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Button, TextField, Typography } from "@mui/material";

const User: React.VFC<{ data: UserModel }> = ({ data }) => {
  const jwt = JsCookies.get("jwt");
  const init = { bookId: 0, userDescription: "" };
  const handleSubmit = async (values: any) => {
    if (jwt === "") {
      return;
    }
    await axios.post(
      "account/books",
      { ...values, userId: data.userId },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  };
  return (
    <>
      <Head>
        <title>Buch in Inventar aufnehmen</title>
      </Head>
      <main className="responsive">
        <Typography variant="h4" component="h1" gutterBottom>
          Buch zum Inventar hinzufügen
        </Typography>
        <Formik initialValues={init} onSubmit={handleSubmit}>
          {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
              }}
            >
              <TextField
                label="bookId"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.bookId ? true : false}
                helperText={errors.bookId}
                value={values.bookId}
                name="bookId"
                type="number"
              />
              <TextField
                label="userDescription"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.userDescription ? true : false}
                helperText={errors.userDescription}
                value={values.userDescription}
                name="userDescription"
              />

              <Button disabled={isSubmitting} type="submit">
                "Änderungen speichern"
              </Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const cookies = new Cookies(req, res);
  const jwt = cookies.get("jwt");

  if (jwt === "" || jwt === undefined) {
    return {
      redirect: {
        destination: "/403",
        permanent: false,
      },
      props: {},
    };
  }
  const { data } = await axios.get("/account", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: { data },
  };
};
