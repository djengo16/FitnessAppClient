import tokenStorage from "./tokenStorage";
import axios from "axios";
import { API_URL } from "./../environment";

/**
 *
 * @param userData  => {username, password}
 */
export async function login(userData) {
  console.log(userData);

  try {
    let data = await axios.post(`${API_URL}/Users/login`, userData);
    tokenStorage.saveToken(data.data.tokenAsString);
  } catch (e) {
    throw new Error(e.response.data);
  }
}
