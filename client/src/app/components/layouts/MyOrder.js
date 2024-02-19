"use client";
import "@/app/styles/MyOrder.scss";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import {
  handleGetAllItem,
  handleGetTransactionByUser,
  handleUpdateTransaction,
} from "@/app/services/ItemService";
import { useRouter } from "next/navigation";
import CartContext from "@/app/context/CartContext";

const MyOrder = () => {
  const [selectedLi, setSelectedLi] = useState(1);
  const [transaction, setTransaction] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const { setOrder } = useContext(CartContext);
  const route = useRouter();
  const handleSelect = (e) => {
    setSelectedLi(e.id);
  };
  const getTransactionOrder = async ({ userID, stateID }) => {
    const respone = await handleGetTransactionByUser({ userID, stateID });

    if (respone?.data?.respone.length != 0) {
      setTransaction(respone?.data?.respone);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };
  const getAllProduct = async ({ userID }) => {
    const respone = await handleGetTransactionByUser({ userID, stateID: null });
    setTransaction(respone?.data?.respone);
    setIsEmpty(false);
  };
  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem("user"))?.id;
    if (selectedLi == "0") {
      getAllProduct({ userID });
    } else {
      getTransactionOrder({ userID, stateID: parseInt(selectedLi) });
    }
  }, [selectedLi]);
  const handleBuyAgain = (id) => {
    route.push(`/product/${id}`);
  };
  const handleReceived = async (id, state) => {
    await handleUpdateTransaction({ id, state: 4 });
    const userID = JSON.parse(localStorage.getItem("user"))?.id;
    getTransactionOrder({ userID, stateID: parseInt(selectedLi) });
  };
  return (
    <>
      <Navbar />
      <div className="order-container">
        <h3>Đơn hàng của tôi </h3>
        <ul className="order-type" onClick={(e) => handleSelect(e.target)}>
          <li id="0" className={selectedLi == "0" ? "type-selected" : ""}>
            Tất cả đơn
          </li>
          <li id="1" className={selectedLi == "1" ? "type-selected" : ""}>
            Chờ thanh toán
          </li>
          <li id="2" className={selectedLi == "2" ? "type-selected" : ""}>
            Đang xử lý
          </li>
          <li id="3" className={selectedLi == "3" ? "type-selected" : ""}>
            Đang vận chuyển
          </li>
          <li id="4" className={selectedLi == "4" ? "type-selected" : ""}>
            Đã giao
          </li>
          <li id="5" className={selectedLi == "5" ? "type-selected" : ""}>
            Đã hủy
          </li>
        </ul>
        {isEmpty ? (
          <div className="empty-container">
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png" />
            <h3>Chưa có đơn hàng</h3>
          </div>
        ) : (
          transaction?.map((index) => (
            <div className="order-detail">
              <h4>{index?.TransactionState?.state}</h4>
              <div className="order-body">
                <div className="item-image">
                  <img src={index?.Item?.image1} />
                  <div className="amount">x{index?.amount}</div>
                </div>
                <p>{index?.Item?.itemName}</p>
                <p className="price">
                  {typeof index?.Item?.oldPrice === "number" &&
                    index?.Item?.oldPrice.toLocaleString("en-US")}
                  <sup>₫</sup>
                </p>
              </div>
              <div className="total-container">
                <p>
                  Tổng tiền:{" "}
                  {typeof index?.price === "number" &&
                    index?.price.toLocaleString("en-US")}
                  <sup>₫</sup>
                </p>
                <div className="button-group">
                  {selectedLi == "3" && (
                    <button
                      className="more-button"
                      onClick={() =>
                        handleReceived(index?.id, parseInt(selectedLi))
                      }
                    >
                      Đã nhận hàng
                    </button>
                  )}

                  <button onClick={() => handleBuyAgain(index?.Item?.id)}>
                    Mua lại
                  </button>
                  <button
                    onClick={() => {
                      route.push("/me/order/view");
                      setOrder(index);
                    }}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
export default MyOrder;
