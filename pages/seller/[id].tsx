import { Typography } from "@mui/material";
import BookCard from "src/components/cards/book";
import {
  BookModel,
  SellerModel,
  SellerSingleModel,
  UserDescription,
} from "src/models";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import axios from "src/utils/httpClient";

const Seller: React.VFC<SellerSingleModel> = ({
  city,
  email,
  firstName,
  houseNum,
  lastName,
  plz,
  sellers,
  shopName,
  street,
  userId,
}) => {
  return (
    <>
      <Head>
        <title>{shopName}</title>
      </Head>
      <main className="responsive">
        <Typography variant="h3" component="h1">
          {shopName}
        </Typography>
        <Typography variant="subtitle1" component="h2">
          {lastName}, {firstName}
        </Typography>
        <Typography variant="body1" component="p">
          <address>
            {email} <br />
            {street} + {houseNum} <br />
            {plz} + {city}
          </address>
        </Typography>
        <Typography variant="body1" component="p">
          {sellers &&
            sellers.map((x: BookModel & UserDescription) => (
              <BookCard {...x} key={x.uid} sellerId={userId} />
            ))}
        </Typography>
      </main>
    </>
  );
};

export default Seller;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await axios.get("/sellers");
  const paths = data.data.map((x: SellerModel) => ({
    params: { id: x.userId + "" },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };
  const model = (await axios.get("sellers/" + id)).data;
  return {
    props: {
      ...model,
    },
    revalidate: 60 * 60 * 24 * 7,
  };
};
