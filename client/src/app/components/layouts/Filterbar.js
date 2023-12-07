"use client";
import { Button } from "react-bootstrap";
import "@/app/styles/Filterbar.scss";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { Radio, RadioGroup, Rating, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ItemService, { handleGetAllItem } from "../../services/ItemService";
const Filterbar = () => {
  const [star, setStar] = useState();
  const handleChangeRate = (e) => {
    setStar(e.target.value);
  };
  return (
    <div className="filterbar-container">
      <div className="price-filter">
        <label>Giá tiền </label>
        <div className="filter-choices">
          <input placeholder="Min"></input>
          <input placeholder="Max"></input>
          <Button>Tìm kiếm</Button>
        </div>
      </div>
      <div className="category-filter">
        <label>Loại mặt hàng</label>
        <div className="category-container">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="electronics" />}
              label="Điện gia dụng"
            />
            <FormControlLabel
              control={<Checkbox name="laptops" />}
              label="Laptop"
            />
            <FormControlLabel
              control={<Checkbox name="toys" />}
              label="Đồ chơi"
            />
            <FormControlLabel
              control={<Checkbox name="office" />}
              label="Đồ văn phòng"
            />
            <FormControlLabel
              control={<Checkbox name="beauty" />}
              label="Mỹ phẩm"
            />
          </FormGroup>
        </div>
      </div>
      <div className="rating-filter">
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={star}
          onChange={handleChangeRate}
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
    </div>
  );
};
export default Filterbar;
