import axios from "axios";

const baseUrl = "http://localhost:8080/api/";

export const getClient = (jwt: string) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
};

export default axios.create({
  baseURL: baseUrl,
});
