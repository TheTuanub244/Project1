import axios from "axios";

export const getProvince = () => {
  return axios.get("https://vapi.vnappmob.com/api/province");
};
