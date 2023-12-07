import axios from "axios";
import { headers } from "../../../next.config";
export const handleGetAllItem = async (id) => {
  return axios.get(`http://localhost:8080/api/getAllItem`, { id });
};
