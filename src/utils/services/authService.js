import tokenStorage from "./tokenStorage";
import axios from "axios";
import { ADMIN_ROLE, API_URL } from "./../environment";
import { getUserActivePlanId } from "./usersService";
import interceptedHttpClient from "../httpClient/interceptedHttpClient";
import { getUserProfilePicture } from "./imageService";

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
  let userId = tokenStorage.decodeToken().nameid;
  setActivePlanId(userId);
  setProfilePictureToStorage(userId);
}

export function setProfilePictureToStorage(userId, profilePicture) {
  if (profilePicture) {
    localStorage.setItem("profilePictureUrl", profilePicture);
  } else {
    getUserProfilePicture(userId).then((response) => {
      const profilePictureUrl = response.data;
      if (profilePictureUrl) {
        localStorage.setItem("profilePictureUrl", profilePictureUrl);
      }
    });
  }
}

export function setActivePlanId(userId) {
  getUserActivePlanId(userId).then((response) => {
    const planId = response.data;
    if (planId) {
      localStorage.setItem("activePlanId", planId);
      return planId;
    }
  });
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
  localStorage.clear();
}

export async function changePassword(data) {
  return interceptedHttpClient.put(`${API_URL}/Users/changepassword`, data);
}

/**
 *
 * @param {current logged user id} id
 * @returns {True if parameter id is equal to current logged user's id or current user is in admin role}
 *
 */
export function hasPermission(id) {
  const token = tokenStorage.decodeToken();
  const activeUserId = token.nameid;
  const activeUserRole = token.role;

  if (id === activeUserId || activeUserRole === ADMIN_ROLE) return true;

  return false;
}
