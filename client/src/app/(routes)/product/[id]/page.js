"use client";

import {
  handleGetAllItem,
  handleGetAllReviewsByProduct,
  handleGetProductById,
} from "@/app/services/ItemService";
import { useContext, useEffect, useState } from "react";
import "@/app/styles/ItemDetails.scss";
import { Stack } from "react-bootstrap";
import { Pagination, Rating, Typography } from "@mui/material";
import { LuShoppingCart } from "react-icons/lu";
import { CiSquarePlus } from "react-icons/ci";
import CartContext from "@/app/context/CartContext";
import Navbar from "@/app/components/layouts/Navbar";
import ReviewCard from "@/app/components/layouts/ReviewCard";
import { handleAddReview } from "@/app/services/UserService";
import { useRouter } from "next/navigation";
const page = ({ params }) => {
  const [item, setItem] = useState();
  const [largImage, setLargeImage] = useState();
  const [reviews, setReviews] = useState();
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [rate, setRate] = useState();
  const [review, setReview] = useState();
  const router = useRouter();
  const getItem = async () => {
    const respone = await handleGetProductById(params.id);
    setItem(respone?.data?.respone);
  };
  useEffect(() => {
    console.log(item);
  }, [item]);
  const { handleAddToCart } = useContext(CartContext);
  useEffect(() => {
    getItem();
    getReviews(page);
  }, [page]);
  const getReviews = async (page) => {
    const respone = await handleGetAllReviewsByProduct({ page, id: params.id });
    setReviews(respone?.data?.respone?.data);
    setTotalPage(respone?.data?.respone?.amount);
    console.log(respone);
  };
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const handleSubmitReview = async () => {
    const userID = JSON.parse(localStorage.getItem("user"))?.id;
    const itemId = parseInt(params.id);
    const respone = await handleAddReview(
      parseInt(userID),
      review,
      rate,
      itemId
    );
    setReviews(respone?.data?.respone);
  };
  const handleBuyNow = () => {
    localStorage.removeItem("productCart");
    handleAddToCart(item);
    router.push("/cart");
  };
  return (
    <>
      <Navbar />
      {item ? (
        <>
          <div className="item-container">
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
                  <button className="buy" onClick={() => handleBuyNow()}>
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
                  <h4>Loại hàng: {item?.Category?.categoryName}</h4>
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
                  avatar={index?.User?.avatar}
                  userName={index?.User?.username}
                  createdDate={index?.createdAt}
                  rate={index?.rate}
                  description={index?.description}
                />
              ))}
            </div>
            <Pagination
              count={totalPage}
              size="large"
              page={page}
              onChange={handleChangePage}
              className="pagination"
            />
            <h3>Viêt đánh giá</h3>
            <div className="write-review">
              <p>
                Tên người dùng:{" "}
                {JSON.parse(localStorage.getItem("user"))?.firstName}
              </p>
              <div className="write-container">
                <Rating
                  name="simple-controlled"
                  value={rate}
                  className="rating"
                  onChange={(event, newValue) => {
                    setRate(newValue);
                  }}
                />
                <input
                  type="text"
                  placeholder="Nhận xét sản phẩm"
                  onChange={(e) => setReview(e.target.value)}
                />
                <button onClick={() => handleSubmitReview()}>Đánh giá</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h4 className="loading">Loading...</h4>
      )}
    </>
  );
};
export default page;
