"use client";

import CartContext from "@/app/context/CartContext";
import { Typography } from "@mui/material";
import { useContext } from "react";
import "@/app/styles/Cart.scss";
import { FaPlus, FaMinus } from "react-icons/fa";
const page = () => {
  const { totalCart, addCart, minusCart } = useContext(CartContext);
  return (
    <>
      <div className="item-list">
        {totalCart?.map((index) => (
          <div className="item-container">
            <img src={index?.data?.image1} />
            <div className="item-name">
              <h4>{index?.data?.itemName}</h4>
              <p>Nhãn hiệu/Người bán: {index?.data?.brand}</p>
            </div>
            <div className="button-group">
              <button onClick={() => minusCart(index?.data)}>
                <FaMinus />
              </button>
              <label>{index?.count}</label>
              <button onClick={() => addCart(index?.data)}>
                <FaPlus />
              </button>
            </div>
            <div className="item-price">
              <h4>{index?.totalPrice}đ</h4>
              <p>{index?.data?.oldPrice}/sản phẩm</p>
            </div>
            <button className="remove-btn">Loại bỏ</button>
          </div>
        ))}
      </div>
    </>
  );
};
export default page;
