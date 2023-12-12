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

const { default: Navbar } = require("./Navbar");

const Shipping = () => {
  const [checkout, setCheckout] = useState();
  useEffect(() => {
    const getCheckout = JSON.parse(localStorage.getItem("checkoutInfo"));
    setCheckout(getCheckout);
  }, []);
  useEffect(() => {
    console.log(checkout);
  }, [checkout]);
  return (
    <>
      <Navbar />
      <div className="container">
        <Stack className="stack">
          <h2>Thông tin giao hàng</h2>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            className="radio-group"
          >
            {checkout && (
              <FormControlLabel
                className="address-box"
                value={5}
                control={<Radio />}
                label={
                  <div className="address-info">
                    <h3>{checkout?.address?.moreAddress}</h3>
                    <p>
                      {checkout?.address?.ward?.ward_name},{" "}
                      {checkout?.address?.district?.district_name},{" "}
                      {checkout?.address?.province?.province_name}
                    </p>
                  </div>
                }
              />
            )}
          </RadioGroup>
        </Stack>
      </div>
    </>
  );
};
export default Shipping;
