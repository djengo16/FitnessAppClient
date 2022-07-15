import tokenStorage from "./tokenStorage";
import axios from "axios";
import { API_URL } from "./../environment";

/**
 *
 * @param userData  => {email, password}
 */
export async function login(userData) {
  try {
    let data = await axios.post(`${API_URL}/Users/login`, userData);
    tokenStorage.saveToken(data.data.tokenAsString);
  } catch (e) {
    throw new Error(e.response.data);
  }
}

/**
 *
 * @param userData  => {email, password}
 */
export async function register(userData) {
  try {
    const { confirmPassword, ...data } = userData;
    await axios.post(`${API_URL}/Users/register`, data);
  } catch (e) {
    throw new Error(e.response.data);
  }
}

export async function logout() {
  localStorage.removeItem("token");
}
