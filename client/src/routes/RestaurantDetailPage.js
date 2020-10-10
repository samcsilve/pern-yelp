import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from '../components/StarRating';
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant, setReviews, reviews } = useContext(
    RestaurantsContext
  );
  useEffect(() => {
    const getData = async (id) => {
        const res = await RestaurantFinder.get(`/restaurants/${id}`)
        setSelectedRestaurant(res.data.data)
        setReviews(res.data.data.reviews)
    };
    getData(id)
  }, []);
  return (
    <div>
        {selectedRestaurant && (
            <>
            <div className="text-center">
              <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
            </div>
            <h1 className="text-center">{selectedRestaurant.restaurant.name}</h1>
            <div className="mt-3">
                <Reviews reviews={reviews}/>
                <AddReview />
            </div>
            </>
        )}
    </div>
  );
};

export default RestaurantDetailPage;
