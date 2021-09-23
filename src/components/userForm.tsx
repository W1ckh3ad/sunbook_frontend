import React from "react";
import { UserModel } from "src/models";
import { Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";

const validation = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  city: yup.string().required(),
  houseNum: yup.string().matches(/\d.*/).required(),
  plz: yup.string().matches(/\d{5}/).required(),
  street: yup.string().required(),
});

interface IUserFormProps {
  model: UserModel;
  onSubmit: any;
}

const UserForm: React.VFC<IUserFormProps> = ({ model, onSubmit }) => {
  const {
    userId,
    city,
    email,
    favPayment,
    firstName,
    houseNum,
    lastName,
    plz,
    role,
    shopName,
    street,
  } = model;
  const init = {
    city: city ?? "",
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    email: email ?? "",
    shopName: shopName ?? "",
    role: role ?? "",
    favPayment: favPayment ?? "",
    plz: plz ?? "",
    houseNum: houseNum ?? "",
    street: street ?? "",
    password: "",
  };
  return (
    <>
      <Typography variant="h4" component="h1">
        {!userId ? "Benutzer erstellen" : `User ${userId}`}
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
              label="email"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email ? true : false}
              helperText={errors.email}
              value={values.email}
              name="email"
            />
            {!userId && (
              <TextField
                label="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password ? true : false}
                helperText={errors.password}
                value={values.password}
                name="password"
                required
              />
            )}
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
            <TextField
              label="favPayment"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.favPayment ? true : false}
              helperText={errors.favPayment}
              value={values.favPayment}
              name="favPayment"
            />
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
              {!userId ? "Benutzer erstellen" : "Änderungen speichern"}
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserForm;
