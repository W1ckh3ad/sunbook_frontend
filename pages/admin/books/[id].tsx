import Cookies from "cookies";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { BookModel, JwtModel, UserModel } from "src/models";
import axios from "src/utils/httpClient";
import parseJwt from "src/utils/parseJwt";
import JsCookies from "js-cookie";
import { FormikHelpers, FormikValues } from "formik";
import BookForm from "src/components/BookForm";

const User: React.VFC<BookModel> = (props) => {
  const { uid } = props;
  const jwt = JsCookies.get("jwt");
  const handleSubmit = async (
    values: FormikValues,
    helper: FormikHelpers<FormikValues>
  ) => {
    helper.setSubmitting(true);
    if (jwt === "") {
      return helper.setSubmitting(false);
    }
    const res = await axios.put("admin/books/" + uid, values, {
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
        <title>Buch {uid}</title>
      </Head>
      <main className="responsive">
        <BookForm model={props} onSubmit={handleSubmit} />
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
  const { data: user } = await axios.get("books/" + id, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: { ...user },
  };
};
