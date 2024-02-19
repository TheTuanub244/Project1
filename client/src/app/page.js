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
  const [itemDisplay, setItemDisplay] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [star, setStar] = useState(null);
  const [category, setCategory] = useState(null);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const getAllItem = async (page) => {
    const respone = await handleGetAllItem(page);
    setItem(respone?.data?.respone);
    if (respone?.data?.respone?.data?.length == 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTotalPage(item?.amount);
    setItemDisplay(item?.data);
  }, [item]);
  useEffect(() => {
    getAllItem({
      page,
      star,
      category,
      max,
      min,
      search,
    });
  }, [star, search, max, min, category, page]);
  const handleChangePage = (event, value) => {
    setPage(value);
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
        {itemDisplay?.length != 0 ? (
          <div className="card-container">
            {itemDisplay?.map((index) => (
              <ItemCard item={index} key={index.id} />
            ))}
            <Pagination
              count={totalPage}
              size="large"
              page={page}
              onChange={handleChangePage}
              className="pagination"
            />
          </div>
        ) : (
          <div className="empty-container">
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png" />
            <h3>Không tìm thấy mặt hàng</h3>
          </div>
        )}
      </div>
    </>
  );
}
