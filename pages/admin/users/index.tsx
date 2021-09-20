import axios from "src/utils/httpClient";
import { JwtModel, UserModel } from "src/models";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Box } from "@mui/material";
import Cookies from "cookies";
import parseJwt from "src/utils/parseJwt";
import Link from "src/components/Link";

const Users: React.VFC<{ data?: UserModel[] }> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Box sx={{ overflowX: "auto", p: 2 }}>
        <table>
          <thead>
            <tr>
              <th>Actions</th>
              <th>id</th>
              <th>email</th>
              <th>firstName</th>
              <th>lastName</th>
              <th>shopName</th>
              <th>street</th>
              <th>houseNum</th>
              <th>plz</th>
              <th>city</th>
              <th>role</th>
              <th>favPayment</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((x: UserModel) => (
                <tr key={x.userId}>
                  <td>
                    <Link href={`/admin/users/${x.userId}`}>Zum User</Link>
                  </td>
                  <td>{x.userId}</td>
                  <td>{x.email}</td>
                  <td>{x.firstName}</td>
                  <td>{x.lastName}</td>
                  <td>{x.shopName}</td>
                  <td>{x.street}</td>
                  <td>{x.houseNum}</td>
                  <td>{x.plz}</td>
                  <td>{x.city}</td>
                  <td>{x.role}</td>
                  <td>{x.favPayment}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Box>
    </>
  );
};

export default Users;

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
  const { data } = await axios.get("admin/users/", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: { data },
  };
};
