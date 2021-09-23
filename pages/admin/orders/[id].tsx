import axios from "src/utils/httpClient";
import { JwtModel } from "src/models";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Box } from "@mui/material";
import Cookies from "cookies";
import parseJwt from "src/utils/parseJwt";
import { OrderModel } from "src/models/orderModel";
import Order from "src/components/Order";
import React from "react";

const OrderSingle: React.VFC<{ data?: OrderModel }> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Bestellung {data && data.id}</title>
      </Head>

      <main className="responsive">
        <Box sx={{ overflowX: "auto", p: 2 }}>
          <Order order={data} />
        </Box>
      </main>
    </>
  );
};

export default OrderSingle;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const cookies = new Cookies(req, res);
  const { id } = params as { id: string };
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
  const { data } = await axios.get("admin/orders/" + id, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: { data },
  };
};
