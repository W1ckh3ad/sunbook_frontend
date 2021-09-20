import { Typography } from "@mui/material";
import axios from "src/utils/httpClient";
import {
  BookModel,
  BookResponseModel,
  UserModel,
  UserDescription,
} from "src/models";
import Head from "next/head";
import SellerCard from "src/components/cards/seller";
import { GetStaticPaths, GetStaticProps } from "next";

const Book: React.VFC<BookResponseModel> = ({
  author,
  binding,
  description,
  uid,
  isbn,
  language,
  picture,
  price,
  publisher,
  releaseDate,
  title,
  genre,
  subtitle,
  sellers,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="responsive">
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
        <Typography variant="subtitle1" component="h2">
          {subtitle}
        </Typography>
        <Typography variant="body1" component="p">
          {author} - {uid} - {binding} - {publisher} - {genre} - {language}
        </Typography>
        <Typography variant="body1" component="p">
          {isbn}
        </Typography>
        <Typography variant="body1" component="p">
          {price} € -{" "}
          {new Date(releaseDate).toLocaleDateString("de-DE", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })}
        </Typography>
        <div>
          <img src={picture} alt={title + " Cover"} />
        </div>
        <Typography variant="body1" component="p">
          {description}
        </Typography>
        {sellers && sellers.length > 0 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {sellers.map((x: (UserDescription & { user: UserModel })) => (
              <SellerCard {...x} key={x.user.userId} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Book;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await axios.get("/books");
  const paths = data.data.map((x: BookModel) => ({
    params: { id: x.uid + "" },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };
  const model = (await axios.get("books/" + id)).data;
  return {
    props: {
      ...model,
    },
    revalidate: 60 * 60 * 24 * 7,
  };
};
