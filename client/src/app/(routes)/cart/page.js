"use client";
import CartContext from "@/app/context/CartContext";
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import "@/app/styles/Cart.scss";
import { FaPlus, FaMinus } from "react-icons/fa";
import { getProvince } from "@/app/services/ApiService";
import AddressModal from "@/app/components/layouts/modals/AddressModal";
import { Button, Modal } from "react-bootstrap";
import Navbar from "@/app/components/layouts/Navbar";
import { usePathname, useRouter } from "next/navigation";
const page = () => {
  const {
    totalCart,
    addCart,
    minusCart,
    handleRemoveProduct,
    setCheckoutInfo,
  } = useContext(CartContext);
  const [selectedProvince, setSelectedProvince] = useState();
  const [selecetedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();
  const [moreAddress, setMoreAddress] = useState();
  const [address, setAddress] = useState();
  const [totalCheckOut, setTotalCheckOut] = useState({});
  const [open, setOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const url = usePathname();
  const [user, setUser] = useState();
  const router = useRouter();
  const handleShow = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeAddress = () => {
    handleShow();
  };
  useEffect(() => {
    const checkSignIn = JSON.parse(localStorage.getItem("user"));
    if (!checkSignIn || Object.keys(checkSignIn).length == 0) {
      setSignIn(false);
    } else {
      setUser(checkSignIn);
      setSignIn(true);
    }
  }, []);
  useEffect(() => {
    const calPrice = totalCart?.reduce((totalPrice, currentPrice) => {
      return totalPrice + currentPrice.totalPrice;
    }, 0);
    const calUnit = totalCart?.reduce((totalUnit, currentUnit) => {
      return totalUnit + currentUnit?.count;
    }, 0);
    setTotalCheckOut({
      unit: calUnit,
      totalPrice: calPrice,
    });
  }, [totalCart]);
  const handleBuyProduct = () => {
    if (signIn == false) {
      localStorage.setItem("callbackURL", JSON.stringify(url));
      router.push("/login");
    } else {
      localStorage.setItem(
        "checkoutInfo",
        JSON.stringify({
          totalCheckOut: totalCheckOut,
          totalCart: totalCart,
          user: user,
          address: address,
        })
      );
      router.push("/shipping");
    }
  };
  return (
    <>
      <Navbar />
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
                    <h4>
                      {index?.totalPrice}
                      <sup>₫</sup>
                    </h4>
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
          <div className="check-btn-container">
            <div className="checkout-container">
              <div className="shipping-container">
                <div className="shipping-header">
                  <h4>Giao tới</h4>
                  <button onClick={() => handleChangeAddress()}>
                    Thay đổi
                  </button>
                </div>
                {user ? (
                  <p
                    style={{
                      color: "black",
                      fontWeight: 600,
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </p>
                ) : (
                  <p></p>
                )}
                {address?.ward && (
                  <p>
                    {address?.ward?.ward_name},{" "}
                    {address?.district?.district_name},{" "}
                    {address?.province?.province_name}
                  </p>
                )}
              </div>
              <div className="cart-price">
                <div className="flex-row">
                  <label>Tạm tính: </label>
                  <p>
                    {totalCheckOut?.totalPrice}
                    <sup>₫</sup>
                  </p>
                </div>
                <div className="flex-row">
                  <label>Số sản phẩm: </label>
                  <p>{totalCheckOut?.unit}</p>
                </div>
                <div className="flex-row">
                  <label>Giảm giá: </label>
                  <p>
                    0<sup>₫</sup>
                  </p>
                </div>
              </div>
              <div className="total-price">
                <div className="flex-row">
                  <label>Tổng tiền: </label>
                  <p>
                    {totalCheckOut?.totalPrice} <sup>₫</sup>
                  </p>
                </div>
              </div>
            </div>
            <button className="submit-btn" onClick={() => handleBuyProduct()}>
              Mua hàng &#40;{totalCheckOut?.unit}&#41;
            </button>
          </div>
        </div>
        <AddressModal
          open={open}
          handleClose={handleClose}
          setSelectedProvince={setSelectedProvince}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedWard={setSelectedWard}
          selectedProvince={selectedProvince}
          selecetedDistrict={selecetedDistrict}
          selectedWard={selectedWard}
          moreAddress={moreAddress}
          setMoreAddress={setMoreAddress}
          setAddress={setAddress}
        />
      </div>
    </>
  );
};
export default page;
