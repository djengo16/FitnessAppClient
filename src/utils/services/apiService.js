import axios from "axios";
import { API_URL } from "./../environment";

export function getAppHelath() {
  return axios.get(`${API_URL}/healthz`);
}
