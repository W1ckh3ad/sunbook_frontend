import axios from "src/utils/httpClient";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Box } from "@mui/material";
import Cookies from "cookies";
import { OrderModel } from "src/models/orderModel";
import Order from "src/components/Order";
import React from "react";

const Orders: React.VFC<{ orders?: OrderModel[] }> = ({ orders }) => {
  return (
    <>
      <Head>
        <title>Eigene Bestellungen</title>
      </Head>

      <main className="responsive">
        <Box sx={{ overflowX: "auto", p: 2 }}>
          {orders &&
            orders.map((x) => (
              <React.Fragment key={x.id}>
                <Order order={x} />
                <hr />
              </React.Fragment>
            ))}
        </Box>
      </main>
    </>
  );
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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
  const { data } = await axios.get("account/orders", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: { orders: data },
  };
};
