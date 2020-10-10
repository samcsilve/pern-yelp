import React, { useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "./StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";

const Reviews = ({ reviews }) => {
  const {setReviews } = useContext(RestaurantsContext);

  const onClick = async (e, id) => {
    e.preventDefault();
    try {
      const res = await RestaurantFinder.delete(
        `/restaurants/deleteReview/${id}`
      );
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (err) {}
  };
  return (
    <div className="row row-cols-3 mb-2">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="card text-white bg-primary mb-3 mr-4"
          style={{ maxWidth: "30" }}
        >
          <div className="card-header d-flex justify-content-between">
            <span>{review.name}</span>
            <span>
              <StarRating rating={review.rating} />
            </span>
            <span
              onClick={(e) => onClick(e, review.id)}
              style={{ cursor: "pointer" }}
            >
              x
            </span>
          </div>
          <div className="card-body">
            <p className="card-text">{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
