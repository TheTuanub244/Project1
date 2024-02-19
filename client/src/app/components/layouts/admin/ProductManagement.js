"use client";
import "@/app/styles/ProductManagement.scss";
import Navbar from "../Navbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter } from "next/navigation";
import CartContext from "@/app/context/CartContext";
import { useEffect, useState } from "react";
import {
  handleGetAllItem,
  handleGetAllTransaction,
} from "@/app/services/ItemService";
const ProductManagement = () => {
  const [option, setOption] = useState();
  const [search, setSearch] = useState();
  const [product, setProduct] = useState();
  const handleChange = (e) => {
    setOption(parseInt(e.target.value));
  };
  const getAllItem = async () => {
    const getTrans = await handleGetAllTransaction({ option: null });
    const getProduct = await handleGetAllItem({ page: null });
    setProduct(getProduct?.data?.respone);
    console.log(product);
  };
  useEffect(() => {
    getAllItem();
  }, []);
  useEffect(() => {
    calSoldProduct();
  }, [product]);
  const calSoldProduct = () => {
    const array = _.countBy(product, "Item.id");
  };
  return (
    <>
      <Navbar />
      <div className="product-management-container">
        <h4>Quản lý mặt hàng</h4>
        <div className="product-table">
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
                <MenuItem value={3}>Giá bán</MenuItem>
                <MenuItem value={4}>Người bán</MenuItem>
                <MenuItem value={5}>Số lượng trong kho</MenuItem>
                <MenuItem value={6}>Số lượng đã bán được</MenuItem>
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
                  Giá bán
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
                  Số lượng trong kho
                </td>
                <td
                  style={{
                    width: 150,
                  }}
                >
                  Số lượng đã bán được
                </td>
              </tr>
            </thead>
            <tbody>
              {product?.map((index) => (
                <tr>
                  <td>{index?.id}</td>
                  <td>
                    <div className="item-image">
                      <img src={index?.image1} />
                      <p>{index?.itemName}</p>
                    </div>
                  </td>
                  <td>
                    {typeof index?.oldPrice == "number" &&
                      index?.oldPrice.toLocaleString("en-US")}
                    <sup>đ</sup>
                  </td>
                  <td>{index?.brand}</td>
                  <td>{index?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ProductManagement;
