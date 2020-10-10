import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";
const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async (props) => {
      try {
        const response = await RestaurantFinder.get("/restaurants");
        setRestaurants(response.data.averages);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const onDelete = async (e, id) => {
    e.stopPropagation()
    try {
      await RestaurantFinder.delete(`/restaurants/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (err) {}
  };

  const onUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleClick = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}`);
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => (
              <tr
                onClick={(e) => handleClick(e, restaurant.id)}
                key={restaurant.id}
              >
                <th>{restaurant.name}</th>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td><StarRating rating={restaurant.average_rating} /></td>
                <td>
                  <button
                    onClick={(e) => onUpdate(e, restaurant.id)}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => onDelete(e, restaurant.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
