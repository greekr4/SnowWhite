import { data } from "autoprefixer";
import axios from "axios";

export const Api = async (link, param) => {
  try {
    const response = await axios.post(link, param);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
