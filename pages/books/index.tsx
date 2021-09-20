import Head from "next/head";

import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { TextField, Divider, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { BookModel, BookQueryModel } from "src/models";
import axios from "src/utils/httpClient";
import BookCard from "src/components/cards/book";
import { GetServerSideProps } from "next";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";
import * as yup from "yup";

const validation = yup.object().shape({
  binding: yup.string(),
  genre: yup.string(),
  minPrice: yup
    .number()
    .positive("Preise müssen größer als 0 sein")
    .lessThan(yup.ref("maxPrice"), "Min Preis ist größer als Max Preis"),
  maxPrice: yup
    .number()
    .positive("Preise müssen größer als 0 sein")
    .moreThan(yup.ref("minPrice"), "Min Preis ist größer als Max Preis"),
});

const BookList: React.VFC<{
  books: BookModel[];
  binding: string | null;
  genre: string | null;
  minPrice: number | null;
  maxPrice: number | null;
}> = ({ books, binding, genre, minPrice, maxPrice }) => {
  const model = {
    binding: binding ?? undefined,
    genre: genre ?? undefined,
    minPrice: minPrice ?? undefined,
    maxPrice: maxPrice ?? undefined,
  };
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Bücher</title>
      </Head>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Bücher
          </Typography>
        </Box>
        <Formik
          initialValues={model}
          validationSchema={validation}
          onSubmit={(values: BookQueryModel) => {
            const { binding, genre, minPrice, maxPrice } = values;
            const search = new URLSearchParams();
            if (binding != null && binding != "") {
              search.append("binding", binding);
            }
            if (genre != null && genre != "") {
              search.append("genre", genre);
            }
            if (minPrice != null && minPrice != 0) {
              search.append("minPrice", minPrice + "");
            }
            if (maxPrice != null && maxPrice != 0) {
              search.append("maxPrice", maxPrice + "");
            }
            router.push({
              pathname: `${router.pathname}`,
              query: values,
            });
          }}
        >
          {({ values, handleChange, handleBlur, errors }) => (
            <Form
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  label="Genre"
                  name="genre"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.genre}
                  value={values.genre}
                  style={{ flex: "auto", flexGrow: 1 }}
                />
                <TextField
                  label="Buchart"
                  name="binding"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.binding}
                  value={values.binding}
                  placeholder="gebundene Ausgabe, Taschenbuch"
                  style={{ flex: "auto", flexGrow: 1 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  label="Min Preis"
                  name="minPrice"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.minPrice}
                  value={values.minPrice}
                  style={{ flex: "auto", flexGrow: 1 }}
                />
                <TextField
                  label="Max Preis"
                  name="maxPrice"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.maxPrice}
                  value={values.maxPrice}
                  style={{ flex: "auto", flexGrow: 1 }}
                />
              </div>
              <Button type="submit">Suchen</Button>
              <Divider />
            </Form>
          )}
        </Formik>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {books &&
            books.length > 0 &&
            books.map((x: BookModel) => <BookCard key={x.uid} {...x} />)}
        </div>
      </Container>
    </>
  );
};

export default BookList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const query = context.query;
    const model: BookQueryModel = {
      genre:
        query.genre != undefined && typeof query.genre === "string"
          ? query.genre
          : undefined,
      binding:
        query.binding != undefined && typeof query.binding === "string"
          ? query.binding
          : undefined,
      minPrice:
        query.minPrice != undefined && typeof query.minPrice === "string"
          ? parseFloat(query.minPrice)
          : undefined,
      maxPrice:
        query.maxPrice != undefined && typeof query.maxPrice === "string"
          ? parseFloat(query.maxPrice)
          : undefined,
    };
    if (isNaN(model.maxPrice as number)) {
      model.maxPrice = undefined;
    }
    if (isNaN(model.minPrice as number)) {
      model.minPrice = undefined;
    }
    validation.validate(model);
    const { genre, binding, minPrice, maxPrice } = model;
    const searchParams = new URLSearchParams();
    if (genre != "" && genre != undefined) {
      searchParams.append("genre", genre);
    }
    if (binding != "" && binding != undefined) {
      searchParams.append("binding", binding);
    }
    if (minPrice != 0 && minPrice != undefined) {
      searchParams.append("minPrice", minPrice + "");
    }
    if (maxPrice != 0 && maxPrice != undefined) {
      searchParams.append("maxPrice", maxPrice + "");
    }
    const url = "books?" + searchParams.toString();
    const books = (await axios.get(url)).data.splice(0, 200);
    return {
      props: {
        books,
        genre: genre ?? null,
        binding: binding ?? null,
        minPrice: minPrice ?? null,
        maxPrice: maxPrice ?? null,
      },
    };
  } catch (error) {
    throw error;
  }
};
