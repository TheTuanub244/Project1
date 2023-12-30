"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/layouts/Navbar";
import Filterbar from "./components/layouts/Filterbar";
import "../app/global.scss";
import { handleGetAllItem } from "./services/ItemService";
import { useContext, useEffect, useState } from "react";
import ItemCard from "./components/layouts/ItemCard";
import CartContext from "./context/CartContext";
import { Button } from "react-bootstrap";
import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";
export default function Home() {
  const [item, setItem] = useState();
  const [totalPage, setTotalPage] = useState(1);
  const [totalItem, setTotalItem] = useState();
  const [itemDisplay, setItemDisplay] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filteredItem, setFilteredItem] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [star, setStar] = useState(null);
  const [category, setCategory] = useState(null);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const getAllItem = async () => {
    const respone = await handleGetAllItem();
    setItem(respone?.data?.respone?.DT);
  };
  useEffect(() => {
    getAllItem();
  }, []);
  useEffect(() => {
    let array = [];
    if (search == "" && !star && !category && !max && !min) {
      for (let i = 1; i <= totalPage; i++) {
        const getItem = _.slice(item, i * i - 1, i * i + 2);
        array.push({
          page: i,
          data: getItem,
        });
      }
      console.log(item);
    } else {
      for (let i = 1; i <= totalPage; i++) {
        const getItem = _.slice(filteredItem, i * i - 1, i * i + 2);
        array.push({
          page: i,
          data: getItem,
        });
      }
    }
    setTotalItem(array);
  }, [totalPage, item]);
  useEffect(() => {
    handleChangePage(page);
  }, [totalItem]);
  const handleChangePage = (number) => {
    const findItem = totalItem?.find((index) => index?.page == number);
    setItemDisplay(findItem?.data);
    setPage(number);
  };
  useEffect(() => {
    if (category && !star & (search == "") && !max && !min) {
      const getFilteredItem = item?.filter(
        (index) => index?.CategoryId == category
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
    } else if (!category && star && search == "" && !max && !min) {
      const getFilteredItem = item?.filter((index) => index?.totalRate == star);
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
    } else if (!category && !star && search == "" && max && min) {
      const getFilteredItem = item?.filter(
        (index) => index?.oldPrice <= max && index?.oldPrice >= min
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
    } else if (category && star && search == "" && !max && !min) {
      const getFilteredItem = item?.filter(
        (index) => index?.totalRate == star && index?.CategoryId == category
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
    } else if (category && !star && search == "" && max && min) {
      const getFilteredItem = item?.filter(
        (index) =>
          index?.CategoryId == category &&
          index?.oldPrice <= max &&
          index?.oldValue >= min
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
    } else if (!category && star && search == "" && max && min) {
      const getFilteredItem = item?.filter(
        (index) =>
          index?.totalRate == star &&
          index?.oldPrice <= max &&
          index?.oldValue >= min
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
    } else if (category && star && search == "" && max && min) {
      const getFilteredItem = item?.filter(
        (index) =>
          index?.totalRate == star &&
          index?.oldPrice <= parseFloat(max) &&
          index?.oldValue >= parseFloat(min) &&
          index?.CategoryId == category
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
      console.log(getFilteredItem);
    } else if (!category && !star && search != "" && !max && !min) {
      const getFilteredItem = item?.filter((index) =>
        index.itemName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
      console.log(getFilteredItem);
    } else if (category && !star && search != "" && !max && !min) {
      const getFilteredItem = item?.filter(
        (index) =>
          index.itemName.toLowerCase().includes(search.toLowerCase()) &&
          index.CategoryId == category
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
      console.log(getFilteredItem);
    } else if (!category && star && search != "" && !max && !min) {
      const getFilteredItem = item?.filter(
        (index) =>
          index.itemName.toLowerCase().includes(search.toLowerCase()) &&
          index.totalRate == star
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
      console.log(getFilteredItem);
    } else if (!category && !star && search != "" && max && min) {
      const getFilteredItem = item?.filter(
        (index) =>
          index.itemName.toLowerCase().includes(search.toLowerCase()) &&
          index?.oldPrice <= parseFloat(max) &&
          index?.oldValue >= parseFloat(min)
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
      console.log(getFilteredItem);
    } else if (category && star && search != "" && !max && !min) {
      const getFilteredItem = item?.filter(
        (index) =>
          index.itemName.toLowerCase().includes(search.toLowerCase()) &&
          index.totalRate == star &&
          index.CategoryId == category
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
      console.log(getFilteredItem);
    } else if (!category && star && search != "" && max && min) {
      const getFilteredItem = item?.filter(
        (index) =>
          index.itemName.toLowerCase().includes(search.toLowerCase()) &&
          index.totalRate == star &&
          index?.oldPrice <= parseFloat(max) &&
          index?.oldValue >= parseFloat(min)
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
      console.log(getFilteredItem);
    } else if (category && !star && search != "" && max && min) {
      const getFilteredItem = item?.filter(
        (index) =>
          index.itemName.toLowerCase().includes(search.toLowerCase()) &&
          index.CategoryId == category &&
          index?.oldPrice <= parseFloat(max) &&
          index?.oldValue >= parseFloat(min)
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
      console.log(getFilteredItem);
    } else if (category && star && search != "" && max && min) {
      const getFilteredItem = item?.filter(
        (index) =>
          index.itemName.toLowerCase().includes(search.toLowerCase()) &&
          index.CategoryId == category &&
          index?.oldPrice <= parseFloat(max) &&
          index?.oldValue >= parseFloat(min) &&
          index.totalRate == star
      );
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
      console.log(getFilteredItem);
    }
  }, [max, min, star, category, search]);
  useEffect(() => {
    let array = [];
    for (let i = 1; i <= totalPage; i++) {
      const getItem = _.slice(filteredItem, i * i - 1, i * i + 2);
      array.push({
        page: i,
        data: getItem,
      });
    }
    setTotalItem(array);
  }, [filteredItem]);
  return (
    <>
      <Navbar
        allItem={item}
        setSearch={setSearch}
        itemDisplay={itemDisplay}
        setItemDisplay={setItemDisplay}
      />
      <div className="container">
        <Filterbar
          star={star}
          setStar={setStar}
          setCategory={setCategory}
          category={category}
          min={min}
          max={max}
          setMin={setMin}
          setMax={setMax}
        />
        {itemDisplay ? (
          <div className="card-container">
            {itemDisplay?.map((index) => (
              <ItemCard item={index} key={index.id} />
            ))}
            <Pagination
              count={totalPage}
              size="large"
              page={page}
              onClick={(e) => handleChangePage(e.target.innerText)}
              className="pagination"
            />
          </div>
        ) : loading ? (
          <p>loading...</p>
        ) : (
          <p>không tìm thấy sản phẩm</p>
        )}
      </div>
    </>
  );
}
