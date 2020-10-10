import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = (props) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const { id } = useParams();
  let history = useHistory()

  useEffect(() => {
    const getData = async (id) => {
      const res = await RestaurantFinder.get(`/restaurants/${id}`);
      setName(res.data.data.restaurant.name);
      setLocation(res.data.data.restaurant.location);
      setPriceRange(res.data.data.restaurant.price_range);
    };
    getData(id);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await RestaurantFinder.put(`/restaurants/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    history.push('/')
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <select
            id="price_range"
            className="custom-select mr-sm-2"
            value={priceRange}
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
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
