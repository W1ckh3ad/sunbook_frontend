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

const User: React.VFC<UserModel> = (props) => {
  const { userId } = props;
  const jwt = JsCookies.get("jwt");
  const handleSubmit = async (
    values: FormikValues,
    helper: FormikHelpers<FormikValues>
  ) => {
    helper.setSubmitting(true);
    if (jwt === "") {
      return helper.setSubmitting(false);
    }
    const res = await axios.put("admin/users/" + userId, values, {
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
        <title>User {userId}</title>
      </Head>
      <main className="responsive">
        <UserForm model={props} onSubmit={handleSubmit} />
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
  const { id } = params as { id: string };
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
  const { data: user } = await axios.get("admin/users/" + id, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: { ...user },
  };
};
