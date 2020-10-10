import React, { useState, useContext } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddReview = () => {
    const location = useLocation()
  let history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const {reviews, setReviews} = useContext(RestaurantsContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await RestaurantFinder.post(`/restaurants/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      setReviews([...reviews, res.data.data.review])
    } catch (err) {}
  };

  return (
    <div className="mb-2">
      <form>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Name"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Review"
            className="form-control"
          />
        </div>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
