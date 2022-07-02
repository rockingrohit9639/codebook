import axios from "axios";

const SERVER_URL = "https://codebook-server-007.herokuapp.com/api";
const LOCAL_URL = "http://localhost:8000/api";

const server = axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? LOCAL_URL
      : SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default server;
