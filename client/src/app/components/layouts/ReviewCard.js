"use client";
import "@/app/styles/ReviewCard.scss";
import { Rating } from "@mui/material";
const ReviewCard = ({ avatar, userName, createdDate, rate, description }) => {
  return (
    <div className="review-card-container">
      <div className="card-header">
        <h4>Người dùng: {userName}</h4>
        <p>{createdDate}</p>
      </div>
      <div className="card-body">
        <div className="rate">
          <Rating name="read-only" value={rate} readOnly precision={0.5} />
          <p>{rate}</p>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default ReviewCard;
