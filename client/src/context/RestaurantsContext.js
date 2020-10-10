import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = props => {
    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const [reviews, setReviews] = useState([])
    return (
        <RestaurantsContext.Provider value={{restaurants, setRestaurants, selectedRestaurant, setSelectedRestaurant, reviews, setReviews}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
}