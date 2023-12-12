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

const { default: Navbar } = require("./Navbar");

const Shipping = () => {
  const [checkout, setCheckout] = useState();
  const [totalAddress, setTotalAddress] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState();
  const [selecetedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();
  const [moreAddress, setMoreAddress] = useState();
  const [address, setAddress] = useState();
  const [addedAddress, setAddedAddress] = useState([]);
  useEffect(() => {
    const getCheckout = JSON.parse(localStorage.getItem("checkoutInfo"));
    setCheckout(getCheckout);
  }, []);
  useEffect(() => {
    setAddedAddress([...addedAddress, address]);
  }, [address]);
  useEffect(() => {
    console.log(addedAddress);
    console.log(checkout?.address?.ward?.ward_id);
  }, [addedAddress]);

  const handleClose = () => {
    setOpen(false);
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
                value={checkout?.address?.ward?.ward_id}
                control={<Radio />}
                label={
                  <div className="address-info">
                    <h3>{checkout?.address?.moreAddress}</h3>
                    <p
                      style={{
                        marginTop: -20,
                      }}
                    >
                      {checkout?.address?.ward?.ward_name},{" "}
                      {checkout?.address?.district?.district_name},{" "}
                      {checkout?.address?.province?.province_name}
                    </p>
                  </div>
                }
              />
            )}
            {addedAddress &&
              addedAddress?.map(
                (index) =>
                  index != undefined && (
                    <FormControlLabel
                      className="address-box"
                      value={index?.ward?.ward_id}
                      control={<Radio />}
                      label={
                        <div className="address-info">
                          <h3>{index?.moreAddress}</h3>
                          <p
                            style={{
                              marginTop: -20,
                            }}
                          >
                            {index?.ward?.ward_name},{" "}
                            {index?.district?.district_name},{" "}
                            {index?.province?.province_name}
                          </p>
                        </div>
                      }
                    />
                  )
              )}
          </RadioGroup>
          <button className="add-new" onClick={() => setOpen(true)}>
            {" "}
            <FaPlus /> Thêm địa chỉ khác
          </button>
          <div className="button-group">
            <button className="back-btn">Quay lại</button>
            <button className="checkout-btn">Thanh toán</button>
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
                    Total: {index.totalPrice}
                    <sup>₫</sup>
                  </p>
                </div>
              </div>
            ))}
          <div className="total-checkout">
            <p>Tổng tiền: </p>
            <p>
              {checkout?.totalCheckOut?.totalPrice}
              <sup>₫</sup>
            </p>
          </div>
        </Stack>
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
