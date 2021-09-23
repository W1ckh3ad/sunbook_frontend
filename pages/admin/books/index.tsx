import axios from "src/utils/httpClient";
import { BookModel, JwtModel, UserModel } from "src/models";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Box } from "@mui/material";
import Cookies from "cookies";
import parseJwt from "src/utils/parseJwt";
import Link from "src/components/Link";

const Books: React.VFC<{ data?: BookModel[] }> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      <Box sx={{ overflowX: "auto", p: 2 }}>
        <Link href="/admin/books/add">Add Buch</Link>
        <table>
          <thead>
            <tr>
              <th>Actions</th>
              <th>id</th>
              <th>Title</th>
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
              data.map((x: BookModel) => (
                <tr key={x.uid}>
                  <td>
                    <Link href={`/admin/books/${x.uid}`}>Zum Buch</Link>
                  </td>
                  <td>{x.uid}</td>
                  <td>{x.title}</td>
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
  const { data } = await axios.get("books/", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return {
    props: { data },
  };
};
