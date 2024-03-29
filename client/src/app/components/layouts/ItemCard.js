"use client";
import CartContext from "@/app/context/CartContext";
import "@/app/styles/ItemCard.scss";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
const ItemCard = ({ item }) => {
  const router = useRouter();
  const { cart, handleAddToCart } = useContext(CartContext);

  return (
    <>
      <div className="card">
        <div className="item-image">
          <img src={item?.image1} />
        </div>
        <div className="item-details">
          <h4 onClick={() => router.push(`/product/${item?.id}`)}>
            {item?.itemName}
          </h4>
          <div className="rating">
            <Rating
              name="read-only"
              value={item?.totalRate}
              readOnly
              precision={0.5}
            />
            <p>{item?.totalRate}</p>
          </div>
          <p
            style={{
              marginTop: -10,
            }}
          >
            {item?.description}
          </p>
        </div>
        <div className="item-checkout">
          <h4>
            {typeof item?.oldPrice === "number" &&
              item?.oldPrice.toLocaleString("en-US")}
            <sup>₫</sup>
          </h4>
          <p>Miễn phí giao hàng</p>
          <button onClick={() => handleAddToCart(item)}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
