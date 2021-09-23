import React from "react";
import { BookModel } from "src/models";
import { Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";

const validation = yup.object().shape({});

interface IUserFormProps {
  model: BookModel;
  onSubmit: any;
}

const BookForm: React.VFC<IUserFormProps> = ({ model, onSubmit }) => {
  const {
    author,
    binding,
    description,
    genre,
    isbn,
    language,
    picture,
    price,
    publisher,
    releaseDate,
    subtitle,
    title,
    uid,
  } = model;
  const init = {
    author: author ?? "",
    binding: binding ?? "",
    description: description ?? "",
    genre: genre ?? "",
    isbn: isbn ?? "",
    language: language ?? "",
    picture: picture ?? "",
    price: price ?? 0,
    publisher: publisher ?? "",
    releaseDate: releaseDate ?? "",
    subtitle: subtitle ?? "",
    title: title ?? "",
  };
  return (
    <>
      <Typography variant="h4" component="h1">
        {!uid ? "Buch erstellen" : `Book ${uid}`}
      </Typography>
      <Formik
        initialValues={init}
        onSubmit={onSubmit}
        validationSchema={validation}
      >
        {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
          <Form
            style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
          >
            <TextField
              label="title"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.title ? true : false}
              helperText={errors.title}
              value={values.title}
              name="title"
            />
            <TextField
              label="subtitle"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.subtitle ? true : false}
              helperText={errors.subtitle}
              value={values.subtitle}
              name="subtitle"
            />
            <TextField
              label="author"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.author ? true : false}
              helperText={errors.author}
              value={values.author}
              name="author"
            />
            <TextField
              label="description"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.description ? true : false}
              helperText={errors.description}
              value={values.description}
              name="description"
              multiline
            />
            <TextField
              label="isbn"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.isbn ? true : false}
              helperText={errors.isbn}
              value={values.isbn}
              name="isbn"
            />
            <TextField
              label="picture"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.picture ? true : false}
              helperText={errors.picture}
              value={values.picture}
              name="picture"
            />
            <TextField
              label="publisher"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.publisher ? true : false}
              helperText={errors.publisher}
              value={values.publisher}
              name="publisher"
            />
            <TextField
              label="price"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.price ? true : false}
              helperText={errors.price}
              value={values.price}
              name="price"
              type="number"
            />
            <TextField
              label="releaseDate"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.releaseDate ? true : false}
              helperText={errors.releaseDate}
              value={values.releaseDate}
              name="releaseDate"
              type="date"
            />
            <TextField
              label="binding"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.binding ? true : false}
              helperText={errors.binding}
              value={values.binding}
              name="binding"
            />

            <Button disabled={isSubmitting} type="submit">
              {!uid ? "Buch erstellen" : "S speichern"}
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BookForm;
