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
  const router = useRouter();
  const getAllItem = async () => {
    const respone = await handleGetAllItem();
    setItem(respone?.data?.respone?.DT);
  };
  useEffect(() => {
    getAllItem();
  }, []);
  useEffect(() => {
    if (item) {
      const pageToDisplpay = Math.ceil(item?.length / 3);
      setTotalPage(pageToDisplpay);
    }
  }, [item]);
  useEffect(() => {
    const getItem = item?.filter((index) =>
      index.itemName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItem(getItem);
    const pageToDisplpay = Math.ceil(getItem?.length / 3);
    setTotalPage(pageToDisplpay);
  }, [search]);
  useEffect(() => {
    let array = [];
    if (search == "") {
      for (let i = 1; i <= totalPage; i++) {
        const getItem = _.slice(item, i * i - 1, i * i + 2);
        array.push({
          page: i,
          data: getItem,
        });
      }
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
  }, [totalPage]);
  useEffect(() => {
    handleChangePage(page);
  }, [totalItem]);
  const handleChangePage = (number) => {
    const findItem = totalItem?.find((index) => index?.page == number);
    setItemDisplay(findItem?.data);
    setPage(number);
  };
  return (
    <>
      <Navbar
        allItem={item}
        setSearch={setSearch}
        itemDisplay={itemDisplay}
        setItemDisplay={setItemDisplay}
      />
      <div className="container">
        <Filterbar />
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
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
