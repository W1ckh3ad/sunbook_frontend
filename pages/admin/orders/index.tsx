import axios from "src/utils/httpClient";
import { JwtModel } from "src/models";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Box } from "@mui/material";
import Cookies from "cookies";
import parseJwt from "src/utils/parseJwt";
import Link from "src/components/Link";
import { OrderModel } from "src/models/orderModel";

const Orders: React.VFC<{ data?: OrderModel[] }> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Bestellungen</title>
      </Head>

      <Box sx={{ overflowX: "auto", p: 2 }}>
        <table>
          <thead>
            <tr>
              <th>Actions</th>
              <th>id</th>
              <th>userId</th>
              <th>value</th>
              <th>createdAt</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((x: OrderModel) => (
                <tr key={x.id}>
                  <td>
                    <Link href={`/admin/orders/${x.id}`}>Zur Bestellung</Link>
                  </td>
                  <td>{x.id}</td>
                  <td>{x.userId}</td>
                  <td>{x.value}</td>
                  <td>{x.createdAt}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Box>
    </>
  );
};

export default Orders;

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
  const { data } = await axios.get("admin/orders/", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: { data },
  };
};
