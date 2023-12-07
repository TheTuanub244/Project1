"use client";
import "@/app/styles/ItemCard.scss";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
const ItemCard = ({ item }) => {
  const router = useRouter();
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
            <p>{item?.description}</p>
          </div>
        </div>
        <div className="item-checkout">
          <h4>{item?.oldPrice}đ</h4>
          <p>Miễn phí giao hàng</p>
          <button>Thêm vào giỏ hàng</button>
        </div>
      </div>
    </>
  );
};
export default ItemCard;
