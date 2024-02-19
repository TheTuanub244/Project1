"use client";

import CartContext from "@/app/context/CartContext";
import { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import "@/app/styles/OrderView.scss";
const OrderView = () => {
  const { order } = useContext(CartContext);
  return (
    <>
      <Navbar />
      <div className="order-view-container">
        <h4>
          Chi tiết đơn hàng #{order?.id} - {order?.TransactionState?.state}
        </h4>
        <p>Ngày đặt hàng: {order?.createdAt}</p>
        <div className="order-info">
          <div className="receive-address">
            <h2>Địa chỉ người nhận</h2>
            <h3>{order?.User?.username}</h3>
            <p>Địa chỉ: {order?.address}</p>
            <p>Số điện thoại: </p>
          </div>
          <div className="receive-address">
            <h2>Hình thức thanh toán</h2>
            <p>{order?.paymentMethod}</p>
          </div>
        </div>
        <div className="order-detail">
          <table>
            <thead>
              <tr>
                <td className="item">Sản phẩm</td>
                <td className="price">Giá</td>
                <td className="amount">Số lượng</td>
                <td className="discount">Giảm giá</td>
                <td className="total">Tạm tính</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="item-name">
                    <img src={order?.Item?.image1} />
                    <h3>{order?.Item?.itemName}</h3>
                  </div>
                  <button>Mua lại</button>
                </td>
                <td>
                  <p>
                    {typeof order?.Item?.oldPrice == "number" &&
                      order?.Item?.oldPrice.toLocaleString("en-US")}
                    <sup>₫</sup>
                  </p>
                </td>
                <td>
                  <p>{order?.amount}</p>
                </td>
                <td>
                  <p>
                    0<sup>₫</sup>
                  </p>
                </td>
                <td>
                  <p>
                    {typeof order?.price == "number" &&
                      order?.price.toLocaleString("en-US")}
                    <sup>₫</sup>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="order-price">
          <div className="price">
            <p
              style={{
                marginRight: 40,
                marginTop: 25,
              }}
            >
              Tạm tính:{" "}
            </p>
            <p
              style={{
                width: 100,
              }}
            >
              {" "}
              {typeof order?.price == "number" &&
                order?.price.toLocaleString("en-US")}
              <sup>₫</sup>
            </p>
          </div>
          <div className="price">
            <p
              style={{
                marginRight: 40,
                marginTop: 25,
              }}
            >
              {" "}
              Phí vận chuyển:{" "}
            </p>
            <p
              style={{
                width: 100,
              }}
            >
              0<sup>₫</sup>
            </p>
          </div>
          <div className="price">
            <p
              style={{
                marginRight: 40,
                marginTop: 25,
              }}
            >
              Khuyến mãi vận chuyển:{" "}
            </p>
            <p
              style={{
                width: 100,
              }}
            >
              0<sup>₫</sup>
            </p>
          </div>
          <div className="price">
            <p
              style={{
                marginRight: 40,
                marginTop: 25,
              }}
            >
              Giảm giá:{" "}
            </p>
            <p
              style={{
                width: 100,
              }}
            >
              0<sup>₫</sup>
            </p>
          </div>
          <div className="price">
            <p
              style={{
                marginRight: 40,
                marginTop: 25,
              }}
            >
              Tổng cộng:{" "}
            </p>
            <p
              className="total-price"
              style={{
                width: 100,
              }}
            >
              {" "}
              {typeof order?.price == "number" &&
                order?.price.toLocaleString("en-US")}
              <sup>₫</sup>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderView;
