"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/layouts/Navbar";
import Filterbar from "./components/layouts/Filterbar";
import "../app/global.scss";
import { handleGetAllItem } from "./services/ItemService";
import { useEffect, useState } from "react";
import ItemCard from "./components/layouts/ItemCard";
export default function Home() {
  const [item, setItem] = useState();
  const getAllItem = async () => {
    const respone = await handleGetAllItem();
    setItem(respone?.data?.respone?.DT);
  };
  useEffect(() => {
    getAllItem();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <Filterbar />
        <div className="card-container">
          {item?.map((index) => (
            <ItemCard item={index} />
          ))}
        </div>
      </div>
    </>
  );
}
