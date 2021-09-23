import axios from "src/utils/httpClient";
import { BookResponseModel, UserDescription } from "src/models";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Box } from "@mui/material";
import Cookies from "cookies";
import Link from "src/components/Link";

const Books: React.VFC<{ data?: (BookResponseModel & UserDescription)[] }> = ({
  data,
}) => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      <Box sx={{ overflowX: "auto", p: 2 }}>
        <Link href="/account/books/add">Add Buch</Link>
        <table>
          <thead>
            <tr>
              <th>Actions</th>
              <th>id</th>
              <th>Title</th>
              <th>Eigene Beschreibung</th>
              <th>Subtitle</th>
              <th>Author</th>
              <th>isbn</th>
              <th>genre</th>
              <th>price</th>
              <th>binding</th>
              <th>publisher</th>
              <th>picture</th>
              <th>releaseDate</th>
              <th>language</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((x: BookResponseModel & UserDescription) => (
                <tr key={x.uid}>
                  <td>
                    <Link href={`/account/books/${x.uid}`}>Zum Buch</Link>
                  </td>
                  <td>{x.uid}</td>
                  <td>{x.title}</td>
                  <td>{x.userDescription} </td>
                  <td>{x.subtitle}</td>
                  <td>{x.author}</td>
                  <td>{x.isbn}</td>
                  <td>{x.genre}</td>
                  <td>{x.price}</td>
                  <td>{x.binding}</td>
                  <td>{x.publisher}</td>
                  <td>{x.picture}</td>
                  <td>{x.releaseDate}</td>
                  <td>{x.language}</td>
                  <td>{x.description && x.description.slice(0, 50)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Box>
    </>
  );
};

export default Books;

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
  const { data } = await axios.get("account/books/", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: { data },
  };
};
