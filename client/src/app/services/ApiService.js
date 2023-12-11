import axios from "axios";

export const getProvince = () => {
  return axios.get("https://vapi.vnappmob.com/api/province");
};
export const getDistrict = (id) => {
  return axios.get(`https://vapi.vnappmob.com/api/province/district/${id}`);
};
export const getWard = (id) => {
  return axios.get(`https://vapi.vnappmob.com/api/province/ward/${id}`);
};
