import axios from "src/utils/httpClient";
import { JwtModel, UserModel } from "src/models";
import Head from "next/head";
import { GetServerSideProps } from "next";

import Cookies from "cookies";
import parseJwt from "src/utils/parseJwt";

const User: React.VFC<UserModel> = ({
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
        <title>User {userId}</title>
      </Head>
      <main className="responsive">
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
        permanent: false
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
