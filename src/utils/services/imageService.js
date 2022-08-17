import axios from "axios";
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
