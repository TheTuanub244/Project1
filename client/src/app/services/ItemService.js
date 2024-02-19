import axios from "axios";
import { headers } from "../../../next.config";
export const handleGetAllItem = async ({
  page,
  star,
  category,
  max,
  min,
  search,
}) => {
  return axios.post(`http://localhost:8080/api/getAllItem`, {
    page,
    star,
    category,
    max,
    min,
    search,
  });
};
export const handleGetProductById = async (id) => {
  return axios.post("http://localhost:8080/api/getProductById", { id });
};
export const handleGetAllReviewsByProduct = async ({ page, id }) => {
  return axios.post("http://localhost:8080/api/getAllReviewsByProduct", {
    page,
    id,
  });
};
export const handleAddTransaction = async (transaction) => {
  return axios.post("http://localhost:8080/api/addTransaction", transaction);
};
export const handleGetTransactionByUser = async ({ userID, stateID }) => {
  return axios.post(`http://localhost:8080/api/getTransaction`, {
    userID,
    stateID,
  });
};
export const handleGetAllTransaction = async ({ option, search }) => {
  return axios.post("http://localhost:8080/api/getAllTransaction", {
    option,
    search,
  });
};
export const handleUpdateTransaction = async ({ id, state }) => {
  return axios.post("http://localhost:8080/api/updateTransaction", {
    id,
    state,
  });
};
