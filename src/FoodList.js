import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FoodList.css";

const FoodList = ({ category, onSelectFood, cartItems, onNavigateToCart }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => {
        const itemsWithRatings = response.data.meals.map((item) => ({
          ...item,
          price: Math.floor(Math.random() * 300) + 100, // Random Price
          rating: (Math.random() * 2 + 3).toFixed(1), // Random Rating (3.0 - 5.0)
          isVeg: category.toLowerCase().includes("veg"), // Assume category-based Veg/Non-Veg
        }));
        setFoodItems(itemsWithRatings);
        setFilteredItems(itemsWithRatings);
      })
      .catch((error) => console.error("Error fetching food items:", error));
  }, [category]);

  /* 🔹 Filter & Sort Logic */
  useEffect(() => {
    let filtered = foodItems.filter((food) =>
      food.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (vegOnly) {
      filtered = filtered.filter((food) => food.isVeg);
    }

    if (sortOrder === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "rating-high-to-low") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredItems(filtered);
  }, [searchTerm, vegOnly, sortOrder, foodItems]);

  return (
    <div className="food-container">
      {/* 🔍 Search & Filters */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search food..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label className="veg-toggle">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={() => setVegOnly(!vegOnly)}
          />
          Veg Only
        </label>
      </div>

      {/* 📊 Sorting & Filters */}
      <div className="filters-sort">
        <div className="filters">
          <button onClick={() => setSortOrder("low-to-high")}>
            Price: Low to High
          </button>
          <button onClick={() => setSortOrder("high-to-low")}>
            Price: High to Low
          </button>
          <button onClick={() => setSortOrder("rating-high-to-low")}>
            Rating: High to Low
          </button>
        </div>
      </div>

      {/* 🍽 Food Items List */}
      <div className="food-list">
        <h2>{category} Items</h2>
        {filteredItems.length > 0 ? (
          filteredItems.map((food) => (
            <div
              key={food.idMeal}
              className="food-item"
              onClick={() => onSelectFood(food.idMeal)}
            >
              <img src={food.strMealThumb} alt={food.strMeal} />
              <div>
                <h3>{food.strMeal}</h3>
                <p>₹{food.price}</p>
                <p className="food-rating">⭐ {food.rating}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No food items found.</p>     
        )}
      </div>

      {/* 🛒 View Cart Button */}
      <button className="view-cart" onClick={onNavigateToCart}>
        View Cart ({cartItems ? cartItems.length : 0})
      </button>
    </div>
  );
};

export default FoodList;
