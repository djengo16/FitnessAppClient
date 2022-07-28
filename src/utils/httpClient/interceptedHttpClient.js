import axios from "axios";
import updateHeaderInterceptor from "./updateHeaderInterceptor";

const interceptedHttpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
updateHeaderInterceptor(interceptedHttpClient);

export default interceptedHttpClient;
