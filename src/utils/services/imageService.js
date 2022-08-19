import axios from "axios";
import { API_URL } from "../environment";
/**
 *
 * @param {} file => file information
 * @returns response with public_id that we need for the img url
 */
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "cde7cplp");

  return axios.post(
    "https://api.cloudinary.com/v1_1/diz18npdj/image/upload",
    formData
  );
}

export async function getUserProfilePicture(userId) {
  return axios.get(`${API_URL}/Users/getProfilePicture/${userId}`);
}
