"use client";
import { getDistrict, getProvince, getWard } from "@/app/services/ApiService";
import "@/app/styles/AddressModal.scss";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
const AddressModal = ({
  open,
  handleClose,
  setSelectedProvince,
  setSelectedDistrict,
  setSelectedWard,
  selectedWard,
  moreAddress,
  selectedProvince,
  selecetedDistrict,
  setMoreAddress,
  setAddress,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  const getProvinceAPI = async () => {
    const respone = await getProvince();
    setProvince(respone?.data?.results);
  };
  const getDistrictAPI = async (id) => {
    const respone = await getDistrict(id);
    setDistrict(respone?.data?.results);
  };
  const getWardAPI = async (id) => {
    const respone = await getWard(id);
    setWard(respone?.data?.results);
  };
  useEffect(() => {
    getProvinceAPI();
  }, []);
  useEffect(() => {
    getDistrictAPI(selectedProvince?.province_id);
  }, [selectedProvince]);
  useEffect(() => {
    getWardAPI(selecetedDistrict?.district_id);
  }, [selecetedDistrict]);
  const handleSubmitAddress = () => {
    setAddress({
      moreAddress: moreAddress,
      province: selectedProvince,
      district: selecetedDistrict,
      ward: selectedWard,
    });
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="modal"
    >
      <Box sx={style} className="box">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="modal-header"
        >
          Địa chỉ giao hàng
          <IoMdClose className="close-btn" onClick={handleClose} />
        </Typography>
        <div className="flex-row">
          <p>Tỉnh/Thành phố: </p>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={selectedProvince}
              defaultValue=""
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              placeholder="Tỉnh/Thành phố"
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <MenuItem value="">
                <em>Chọn tỉnh/thành phố</em>
              </MenuItem>
              {province?.map((index) => (
                <MenuItem value={index}>{index.province_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex-row">
          <p>Quận/Huyện: </p>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={selectedProvince}
              defaultValue=""
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              placeholder="Quận/Huyện"
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <MenuItem value="">
                <em>Chọn quận/huyện</em>
              </MenuItem>
              {district?.map((index) => (
                <MenuItem value={index}>{index.district_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex-row">
          <p>Phường/Xã: </p>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={selectedProvince}
              defaultValue=""
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              placeholder="Phường/Xã"
              onChange={(e) => setSelectedWard(e.target.value)}
            >
              <MenuItem value="">
                <em>Chọn phường/xã</em>
              </MenuItem>
              {ward?.map((index) => (
                <MenuItem value={index}>{index.ward_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex-row">
          <p>Địa chỉ: </p>
          <input type="text" onChange={(e) => setMoreAddress(e.target.value)} />
        </div>
        <button onClick={() => handleSubmitAddress()}>Thay đổi</button>
      </Box>
    </Modal>
  );
};
export default AddressModal;
