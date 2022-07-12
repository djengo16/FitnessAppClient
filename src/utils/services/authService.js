import tokenStorage from './tokenStorage';
import axios from 'axios'
import { Form } from 'formik'
import { API_URL } from './../environment';
export {API_URL} from './../environment';

/**
 *
 * @param userData  => {username, password}
 */
export async function login(userData){
console.log(userData)

try{
    let data = await axios.post(`${API_URL}/Users/login`, userData);
    tokenStorage.saveToken(data.data.tokenAsString);
    console.log(`From decoded: ${tokenStorage.decodeToken()}`);
    console.log(data);
}catch(e){
    throw new Error(e);
}
}