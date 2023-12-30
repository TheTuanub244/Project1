"use client";

import {
  handleGetAllItem,
  handleGetAllReviewsByProduct,
} from "@/app/services/ItemService";
import { useContext, useEffect, useState } from "react";
import "@/app/styles/ItemDetails.scss";
import { Stack } from "react-bootstrap";
import { Rating, Typography } from "@mui/material";
import { LuShoppingCart } from "react-icons/lu";
import { CiSquarePlus } from "react-icons/ci";
import CartContext from "@/app/context/CartContext";
import Navbar from "@/app/components/layouts/Navbar";
import ReviewCard from "@/app/components/layouts/ReviewCard";
const page = ({ params }) => {
  const [item, setItem] = useState();
  const [largImage, setLargeImage] = useState();
  const [reviews, setReviews] = useState();
  const getItem = async () => {
    const respone = await handleGetAllItem(params.id);
    setItem(respone?.data?.respone?.DT[0]);
  };
  const { handleAddToCart } = useContext(CartContext);
  useEffect(() => {
    getItem();
    getReviews();
  }, []);
  const getReviews = async () => {
    const respone = await handleGetAllReviewsByProduct(1);
    setReviews(respone?.data?.respone);
  };
  return (
    <>
      <Navbar />
      {item ? (
        <>
          <div className="container">
            <div className="left-container">
              <div className="large-image">
                <img src={largImage ? largImage : item?.image1} />
              </div>
              <div className="small-image">
                <img
                  src={item?.image1}
                  onClick={(e) => setLargeImage(e.target?.src)}
                  className={
                    !largImage
                      ? "active-image"
                      : largImage === item?.image1
                      ? "active-image"
                      : ""
                  }
                />
                <img
                  src={item?.image2}
                  onClick={(e) => setLargeImage(e.target?.src)}
                  className={largImage === item?.image2 ? "active-image" : ""}
                />
                <img
                  src={item?.image3}
                  onClick={(e) => setLargeImage(e.target?.src)}
                  className={largImage === item?.image3 ? "active-image" : ""}
                />
                <img
                  src={item?.image4}
                  onClick={(e) => setLargeImage(e.target?.src)}
                  className={largImage === item?.image4 ? "active-image" : ""}
                />
              </div>
            </div>
            <div className="right-container">
              <Stack className="">
                <h2>{item?.itemName}</h2>
                <div className="rating">
                  <Rating
                    name="read-only"
                    value={item?.totalRate}
                    readOnly
                    precision={0.5}
                  />
                  <p>{item?.totalRate}</p>
                  {item?.totalRate >= 4.5 ? (
                    <p className="verified">Rất tốt</p>
                  ) : (
                    <p></p>
                  )}
                </div>
                <h4>
                  {typeof item?.oldPrice === "number" &&
                    item?.oldPrice.toLocaleString("en-US")}
                  đ
                </h4>
                <p>{item?.description}</p>
                <div className="item-checkout">
                  <button
                    className="to-cart"
                    onClick={() => handleAddToCart(item)}
                  >
                    <LuShoppingCart className="icon" />
                    Thêm vào giỏ hàng
                  </button>
                  <button className="buy">
                    <CiSquarePlus className="icon" />
                    Mua ngay
                  </button>
                </div>
                <div className="flex">
                  <h4>Tình trạng: </h4>
                  {item?.quantity > 0 ? (
                    <p
                      style={{
                        color: "green",
                        fontWeight: 600,
                      }}
                    >
                      Còn hàng
                    </p>
                  ) : (
                    <p
                      style={{
                        color: "red",
                        fontWeight: 600,
                      }}
                    >
                      Hết hàng
                    </p>
                  )}
                </div>
                <div className="flex">
                  <h4>Loại hàng: </h4>
                  <p>{item?.categoryId}</p>
                </div>
                <div className="flex">
                  <h4>Người bán/Thương hiệu: </h4>
                  <p>{item?.brand}</p>
                </div>
              </Stack>
            </div>
          </div>
          <div className="review-container">
            <h3>Khách hàng và đánh giá</h3>
            <div className="review-item-card">
              {reviews?.map((index) => (
                <ReviewCard
                  avatar={index.User.avatar}
                  userName={index.User.username}
                  createdDate={index.createdAt}
                  rate={index.rate}
                  description={index.description}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
export default page;
