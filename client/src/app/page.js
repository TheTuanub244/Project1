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
  const getAllItem = async () => {
    const respone = await handleGetAllItem();
    setItem(respone?.data?.respone?.DT);
  };
  useEffect(() => {
    getAllItem();
  }, []);
  useEffect(() => {
    if (item) {
      const pageToDisplpay = Math.ceil(item?.length / 2);
      setTotalPage(pageToDisplpay);
    }
  }, [item]);
  useEffect(() => {
    const getItem = item?.filter((index) =>
      index.itemName.toLowerCase().includes(search.toLowerCase())
    );
    if (star) {
      let getRatingFilteredItem = getItem?.filter(
        (index) => index.totalRate == star
      );
      if (getRatingFilteredItem.length == 0) {
        setLoading(false);
        setFilteredItem(getRatingFilteredItem);
        const pageToDisplpay = Math.ceil(getRatingFilteredItem?.length / 2);
        setTotalPage(pageToDisplpay);
      } else {
        if (category) {
          const getCategoryFilteredItem = getRatingFilteredItem?.filter(
            (index) => index.CategoryId == category
          );
          if (getCategoryFilteredItem.length != 0) {
            setFilteredItem(getCategoryFilteredItem);
            const pageToDisplpay = Math.ceil(getRatingFilteredItem?.length / 2);
            setTotalPage(pageToDisplpay);
            console.log(true);
          } else {
            console.log(true);
            setLoading(false);
            setFilteredItem(getCategoryFilteredItem);
            const pageToDisplpay = Math.ceil(getRatingFilteredItem?.length / 2);
            setTotalPage(pageToDisplpay);
          }
        } else {
          setFilteredItem(getRatingFilteredItem);
          const pageToDisplpay = Math.ceil(getRatingFilteredItem?.length / 2);
          setTotalPage(pageToDisplpay);
        }
      }
    } else {
      if (category) {
        const getCategoryFilteredItem = getItem?.filter(
          (index) => index.CategoryId == category
        );
        console.log(getCategoryFilteredItem);
        console.log(getItem);
        if (getCategoryFilteredItem.length != 0) {
          setFilteredItem(getCategoryFilteredItem);
          const pageToDisplpay = Math.ceil(getCategoryFilteredItem?.length / 2);
          setTotalPage(pageToDisplpay);
        } else {
          setLoading(false);
          setFilteredItem(getCategoryFilteredItem);
          const pageToDisplpay = Math.ceil(getCategoryFilteredItem?.length / 2);
          setTotalPage(pageToDisplpay);
        }
      } else {
        setFilteredItem(getItem);
        const pageToDisplpay = Math.ceil(getItem?.length / 2);
        setTotalPage(pageToDisplpay);
      }
    }
  }, [search]);
  useEffect(() => {
    let array = [];
    if (search == "" && !star) {
      for (let i = 1; i <= totalPage; i++) {
        const getItem = _.slice(item, i * i - 1, i * i + 2);
        array.push({
          page: i,
          data: getItem,
        });
      }
    } else if (search != "") {
      for (let i = 1; i <= totalPage; i++) {
        const getItem = _.slice(filteredItem, i * i - 1, i * i + 2);
        array.push({
          page: i,
          data: getItem,
        });
      }
    }
    setTotalItem(array);
  }, [totalPage]);
  useEffect(() => {
    handleChangePage(page);
  }, [totalItem]);
  const handleChangePage = (number) => {
    const findItem = totalItem?.find((index) => index?.page == number);
    setItemDisplay(findItem?.data);
    setPage(number);
  };
  useEffect(() => {
    const getFilteredItem = item?.filter((index) => index?.totalRate == star);
    if (search == "" && category) {
      const getCategoryFilterItem = getFilteredItem?.filter(
        (index) => index?.CategoryId == category
      );
      setFilteredItem(getCategoryFilterItem);
      const pageToDisplpay = Math.ceil(getCategoryFilterItem?.length / 2);
      setTotalPage(pageToDisplpay);
    } else if (search == "" && !category) {
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
    }
  }, [star]);
  useEffect(() => {
    if (star) {
      const getFilteredItem = filteredItem?.filter(
        (index) => index?.CategoryId == category
      );
      if (getFilteredItem?.length == 0) {
        setLoading(false);
      }
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
    } else {
      const getFilteredItem = item?.filter(
        (index) => index?.CategoryId == category
      );
      if (getFilteredItem?.length == 0) {
        setLoading(false);
      }
      setFilteredItem(getFilteredItem);
      const pageToDisplpay = Math.ceil(getFilteredItem?.length / 2);
      setTotalPage(pageToDisplpay);
    }
  }, [category]);
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
          allItem={item}
          setFilteredItem={setFilteredItem}
          setTotalPage={setTotalPage}
          star={star}
          setStar={setStar}
          setCategory={setCategory}
          category={category}
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
