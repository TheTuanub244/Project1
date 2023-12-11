"use client";
import CartContext from "@/app/context/CartContext";
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import "@/app/styles/Cart.scss";
import { FaPlus, FaMinus } from "react-icons/fa";
import { getProvince } from "@/app/services/ApiService";
import AddressModal from "@/app/components/layouts/modals/AddressModal";
import { Button, Modal } from "react-bootstrap";
const page = () => {
  const { totalCart, addCart, minusCart, handleRemoveProduct } =
    useContext(CartContext);
  const [address, setAddress] = useState({});
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [show, setShow] = useState(false);
  const handleGetProvince = async () => {
    const respone = await getProvince();
    setProvince(respone?.data?.results);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    handleGetProvince();
  }, []);
  const handleChangeAddress = () => {
    handleShow();
  };
  return (
    <div>
      <div className="cart-container">
        {totalCart.length !== 0 ? (
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
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveProduct(index?.data?.id)}
                >
                  Loại bỏ
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h4>Không có sản phẩm nào trong giỏ hàng</h4>
        )}
        <div className="checkout-container">
          <div className="shipping-container">
            <div className="shipping-header">
              <h4>Giao tới</h4>
              <button onClick={() => handleChangeAddress()}>Thay đổi</button>
            </div>
          </div>
        </div>
      </div>
      <AddressModal show={show} handleClose={handleClose} />
    </div>
  );
};
export default page;
