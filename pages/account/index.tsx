import Head from "next/head";
import { GetServerSideProps } from "next";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Cookies from "cookies";
import axios from "src/utils/httpClient";
import { UserModel } from "src/models";

const Account: React.VFC<UserModel> = ({
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
  userId,
}) => {
  return (
    <>
      <Head>
        <title>Profil</title>
      </Head>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profil
          </Typography>
          <div>{shopName}</div>
          <div>
            {firstName} {lastName}
          </div>
          <div>{email}</div>
          <div>
            <address>
              {street} {houseNum} <br />
              {plz} {city}
            </address>
          </div>
          <div>{favPayment}</div>
          <div>
            {userId} {role}
          </div>
        </Box>
      </Container>
    </>
  );
};
export default Account;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const jwt = cookies.get("jwt");
  if (jwt === "" || jwt === undefined) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false
      },
      props: {},
    };
  }
  const { data: user } = await axios.get("account", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: { ...user },
  };
};
