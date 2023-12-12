"use client";

import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  Stack,
} from "@mui/material";

const { default: Navbar } = require("./Navbar");

const Shipping = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Stack>
          <h3>Thông tin giao hàng</h3>
          <div className="radio-box">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              className="radio-group"
            >
              <FormControlLabel
                value={5}
                control={<Radio />}
                label={<Rating name="read-only" value={5} readOnly />}
              />
              <FormControlLabel
                value={4}
                control={<Radio />}
                label={<Rating name="read-only" value={4} readOnly />}
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label={<Rating name="read-only" value={3} readOnly />}
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label={<Rating name="read-only" value={2} readOnly />}
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label={<Rating name="read-only" value={1} readOnly />}
              />
            </RadioGroup>
          </div>
        </Stack>
      </div>
    </>
  );
};
export default Shipping;
