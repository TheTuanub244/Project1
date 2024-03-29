"use client";
import CartContext from "@/app/context/CartContext";
import "@/app/styles/Shipping.scss";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  Stack,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import AddressModal from "./modals/AddressModal";
import { handleAddTransaction } from "@/app/services/ItemService";
import { useRouter } from "next/navigation";

const { default: Navbar } = require("./Navbar");

const Shipping = () => {
  const [checkout, setCheckout] = useState();
  const [open, setOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState();
  const [selecetedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();
  const [moreAddress, setMoreAddress] = useState();
  const [address, setAddress] = useState();
  const [addedAddress, setAddedAddress] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState();
  const router = useRouter();
  useEffect(() => {
    const getCheckout = JSON.parse(localStorage.getItem("checkoutInfo"));
    setCheckout(getCheckout);
  }, []);
  useEffect(() => {
    setAddedAddress([...addedAddress, address]);
  }, [address]);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    console.log(addedAddress);
  }, [addedAddress]);
  const handlePayment = async () => {
    const respone = JSON.parse(localStorage.getItem("checkoutInfo"));
    const addressString = Object.values(respone.address)
      .filter((value) => value !== undefined)
      .join(", ");
    console.log(paymentMethod);
    respone?.totalCart.map(async (index) => {
      const transaction = {
        address: addressString,
        amount: index.count,
        price: index.totalPrice,
        itemID: index.data.id,
        userID: respone.user.id,
        paymentMethod: paymentMethod,
      };
      await handleAddTransaction(transaction);
    });
    router.push("/me/order");
  };
  return (
    <>
      <Navbar />
      <div className="shipping-checkout-container">
        <Stack className="stack">
          <h2>Thông tin giao hàng</h2>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            className="radio-group"
            defaultValue={checkout?.address?.ward?.ward_id}
          >
            {checkout && (
              <FormControlLabel
                className="address-box"
                value={checkout?.address?.ward}
                control={<Radio />}
                label={
                  <div className="address-info">
                    <h3>{checkout?.address?.moreAddress}</h3>
                    <p
                      style={{
                        marginTop: -20,
                      }}
                    >
                      {checkout?.address?.ward}, {checkout?.address?.district},{" "}
                      {checkout?.address?.province}
                    </p>
                  </div>
                }
              />
            )}
            {addedAddress &&
              addedAddress?.map(
                (address, index) =>
                  address != undefined && (
                    <FormControlLabel
                      className="address-box"
                      value={index}
                      control={<Radio />}
                      label={
                        <div className="address-info">
                          <h3>{address?.moreAddress} </h3>
                          <p
                            style={{
                              marginTop: -20,
                            }}
                          >
                            {address?.ward}, {address?.district},{" "}
                            {address?.province}
                          </p>
                        </div>
                      }
                    />
                  )
              )}
          </RadioGroup>
          <button
            className="add-new"
            onClick={() => {
              setSelectedDistrict();
              setOpen(true);
            }}
          >
            {" "}
            <FaPlus /> Thêm địa chỉ khác
          </button>
          <div className="button-group">
            <button className="back-btn">Quay lại</button>
            <button className="checkout-btn" onClick={() => handlePayment()}>
              Thanh toán
            </button>
          </div>
        </Stack>
        <Stack className="shipping-cart">
          <h3>Sản phẩm trong giỏ hàng</h3>
          {checkout &&
            checkout.totalCart.map((index) => (
              <div className="shipping-item">
                <div className="item-image">
                  <img src={index.data.image1} />
                  <p className="item-amount">{index.count}</p>
                </div>
                <div className="shipping-item-detail">
                  <p>{index.data.itemName}</p>
                  <p>
                    Total:{" "}
                    {typeof index.totalPrice === "number" &&
                      index.totalPrice.toLocaleString("en-US")}
                    <sup>₫</sup>
                  </p>
                </div>
              </div>
            ))}
          <div className="total-checkout">
            <p>Tổng tiền: </p>
            <p>
              {typeof checkout?.totalCheckOut?.totalPrice === "number" &&
                checkout?.totalCheckOut?.totalPrice.toLocaleString("en-US")}
              <sup>₫</sup>
            </p>
          </div>
        </Stack>
      </div>
      <div className="payment-method">
        <h4>Phương thức thanh toán</h4>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel
            className="payment-method-bõ"
            value={"Thanh toán tiền mặt khi nhận hàng"}
            control={<Radio />}
            label={
              <div className="address-info">
                <p>Thanh toán tiền mặt khi nhận hàng</p>
              </div>
            }
          />
        </RadioGroup>
      </div>
      <AddressModal
        open={open}
        handleClose={handleClose}
        selecetedDistrict={selecetedDistrict}
        selectedProvince={selectedProvince}
        selectedWard={selectedWard}
        setSelectedDistrict={setSelectedDistrict}
        setSelectedProvince={setSelectedProvince}
        setSelectedWard={setSelectedWard}
        setMoreAddress={setMoreAddress}
        moreAddress={moreAddress}
        setAddress={setAddress}
      />
    </>
  );
};
export default Shipping;
