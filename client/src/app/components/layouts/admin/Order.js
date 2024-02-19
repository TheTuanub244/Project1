"use client";
import "@/app/styles/OrderManagement.scss";
import Navbar from "../Navbar";
import {
  handleGetAllTransaction,
  handleGetTransactionByUser,
  handleUpdateTransaction,
} from "@/app/services/ItemService";
import { useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter } from "next/navigation";
import CartContext from "@/app/context/CartContext";
const Order = () => {
  const [transaction, setTransaction] = useState();
  const [option, setOption] = useState();
  const [search, setSearch] = useState();
  const router = useRouter();
  const { setOrder } = useContext(CartContext);
  const getAllTransaction = async ({ option, search }) => {
    const respone = await handleGetAllTransaction({ option, search });
    setTransaction(respone?.data?.respone);
  };
  useEffect(() => {
    getAllTransaction({ option, search });
  }, [option, search]);
  useEffect(() => {
    console.log(transaction);
  }, [transaction]);
  const handleChange = (e) => {
    setOption(parseInt(e.target.value));
  };
  const handleShowTransaction = (order) => {
    // router.push("/me/order/view");
    setOrder(order);
  };
  const handleChangeState = async (id, state) => {
    const respone = await handleUpdateTransaction({ id, state });
    setTransaction(respone?.data?.respone);
  };
  useEffect(() => {
    console.log(transaction);
  }, [transaction]);
  return (
    <>
      <Navbar />
      <div className="order-management-container">
        <h4>Quản lý đơn hàng</h4>
        <div className="order-table">
          <div className="search-box">
            <FormControl className="form-control">
              <InputLabel id="demo-simple-select-label">Option</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option}
                label="Option"
                onChange={handleChange}
              >
                <MenuItem value={1}>ID</MenuItem>
                <MenuItem value={2}>Sản phẩm</MenuItem>
                <MenuItem value={3}>Số lượng</MenuItem>
                <MenuItem value={4}>Người bán</MenuItem>
                <MenuItem value={5}>Người mua</MenuItem>
                <MenuItem value={6}>Thời gian giao dịch</MenuItem>
              </Select>
            </FormControl>
            <input
              type="text"
              placeholder="search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <table>
            <thead>
              <tr>
                <td
                  style={{
                    width: 50,
                  }}
                >
                  ID
                </td>
                <td
                  style={{
                    width: 400,
                  }}
                >
                  Sản phẩm
                </td>
                <td
                  style={{
                    width: 100,
                  }}
                >
                  Số lượng
                </td>
                <td
                  style={{
                    width: 100,
                  }}
                >
                  Người bán
                </td>
                <td
                  style={{
                    width: 100,
                  }}
                >
                  Người mua
                </td>
                <td
                  style={{
                    width: 150,
                  }}
                >
                  Thời gian giao dịch
                </td>
                <td
                  style={{
                    width: 100,
                  }}
                >
                  Tổng số tiền
                </td>
                <td>Tình trạng đơn hàng</td>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((index) => (
                <tr onClick={() => handleShowTransaction(index)}>
                  <td>{index?.id}</td>
                  <td>
                    <div className="item-image">
                      <img src={index?.Item?.image1} />
                      <p>{index?.Item?.itemName}</p>
                    </div>
                  </td>
                  <td>{index?.amount}</td>
                  <td>{index?.Item?.brand}</td>
                  <td>
                    {index?.User?.lastName} {index?.User?.firstName}
                  </td>
                  <td>{index?.createdAt}</td>
                  <td>
                    {typeof index.price == "number" &&
                      index?.price.toLocaleString("en-US")}
                    <sup>đ</sup>
                  </td>
                  <td>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={index.TransactionState?.id}
                      label="Option"
                      onChange={(e) =>
                        handleChangeState(index?.id, e.target.value)
                      }
                    >
                      <MenuItem value={1}>Chờ xác nhận</MenuItem>
                      <MenuItem value={2}>Đang xác nhận</MenuItem>
                      <MenuItem value={3}>Đang vận chuyển</MenuItem>
                      <MenuItem value={4}>Đã giao</MenuItem>
                      <MenuItem value={5}>Đã hủy</MenuItem>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Order;
