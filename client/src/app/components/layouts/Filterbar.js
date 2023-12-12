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
const Filterbar = ({
  allItem,
  setFilteredItem,
  setTotalPage,
  star,
  setStar,
  setCategory,
  category,
}) => {
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
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              control={<Radio name="electronics" value={1} />}
              label="Điện gia dụng"
            />
            <FormControlLabel
              control={<Radio name="laptops" value={2} />}
              label="Laptop"
            />
            <FormControlLabel
              control={<Radio name="toys" value={3} />}
              label="Đồ chơi"
            />
            <FormControlLabel
              control={<Radio name="office" value={4} />}
              label="Đồ văn phòng"
            />
            <FormControlLabel
              control={<Radio name="beauty" value={5} />}
              label="Mỹ phẩm"
            />
          </RadioGroup>
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
