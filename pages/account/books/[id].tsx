import Cookies from "cookies";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import axios from "src/utils/httpClient";
import JsCookies from "js-cookie";
import { BookModel, UserDescription, UserModel } from "src/models";
import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import BookCard from "src/components/cards/book";

const EditBookSingle: React.VFC<
  BookModel & { user: UserModel } & UserDescription
> = (props) => {
  const { uid, user, userDescription } = props;
  const jwt = JsCookies.get("jwt");
  const init = { userDescription };
  const handleSubmit = async (values: any) => {
    if (jwt === "") {
      return;
    }
    await axios.post(
      "account/books/" + uid,
      { ...values, userId: user.userId },
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
        <title>Buch im Inventar bearbeiten</title>
      </Head>
      <main className="responsive">
        <Typography variant="h4" component="h1" gutterBottom>
          Buch im Inventar bearbeiten
        </Typography>
        <BookCard {...props} />
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
export default EditBookSingle;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const { id } = params as { id: string };
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
  const { data } = await axios.get("account/books/" + id, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: { ...data },
  };
};
