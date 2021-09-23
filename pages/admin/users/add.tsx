import Cookies from "cookies";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import UserForm from "src/components/userForm";
import { JwtModel, UserModel } from "src/models";
import axios from "src/utils/httpClient";
import parseJwt from "src/utils/parseJwt";
import JsCookies from "js-cookie";
import { FormikHelpers, FormikValues } from "formik";

const UserAdd: React.VFC<UserModel> = (props) => {
  const jwt = JsCookies.get("jwt");
  const handleSubmit = async (
    values: FormikValues,
    helper: FormikHelpers<FormikValues>
  ) => {
    debugger;
    helper.setSubmitting(true);
    if (jwt === "") {
      return helper.setSubmitting(false);
    }
    const res = await axios.post("admin/users", values, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    helper.setSubmitting(false);
    return res.data;
  };
  return (
    <>
      <Head>
        <title>User erstellen</title>
      </Head>
      <main className="responsive">
        <UserForm model={props} onSubmit={handleSubmit} />
      </main>
    </>
  );
};

export default UserAdd;

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
