import React, { useState, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await RestaurantFinder.post("/restaurants", {
        name,
        location,
        price_range: priceRange,
      });
      setRestaurants([...restaurants, res.data.data.restaurant]);
    } catch (err) {}
  };

  return (
    <div className="mb-4">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              type="text"
              placeholder="Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              value={location}
              type="text"
              placeholder="Location"
              className="form-control"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="col">
            <select
              value={priceRange}
              className="custom-select mr-sm-2"
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
