import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FoodCategories.css";

const FoodCategories = ({ onSelectCategory, setPage, cartItems }) => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [vegMode, setVegMode] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Relevance");

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        setCategories(response.data.categories);
        setFilteredCategories(response.data.categories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Filter & Sort Logic
  useEffect(() => {
    let updatedCategories = [...categories];

    // Search Filter
    if (searchQuery) {
      updatedCategories = updatedCategories.filter((category) =>
        category.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Veg / Non-Veg Filter (Dummy Logic)
    if (vegMode) {
      updatedCategories = updatedCategories.filter((category) =>
        category.strCategory.toLowerCase().includes("veg")
      );
    }

    // Price & Ratings Filter (Modify as Needed)
    if (selectedFilter !== "All") {
      updatedCategories = updatedCategories.filter((category) =>
        category.strCategory.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    }

    // Sorting (Modify Sorting Criteria as Needed)
    if (sortOption === "Price: Low to High") {
      updatedCategories.sort((a, b) => a.strCategory.length - b.strCategory.length);
    } else if (sortOption === "Price: High to Low") {
      updatedCategories.sort((a, b) => b.strCategory.length - a.strCategory.length);
    }

    setFilteredCategories(updatedCategories);
  }, [searchQuery, vegMode, selectedFilter, sortOption, categories]);

  return (
    <div className="food-container">
      {/* Top Bar: Search & Veg Mode Toggle */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search food..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="veg-toggle">
          <input
            type="checkbox"
            checked={vegMode}
            onChange={() => setVegMode(!vegMode)}
          />
          Veg Mode
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="filters-sort">
        <div className="filters">
          <button onClick={() => setSelectedFilter("All")}>All</button>
          <button onClick={() => setSelectedFilter("Veg")}>Veg</button>
          <button onClick={() => setSelectedFilter("Non-Veg")}>Non-Veg</button>
          <button onClick={() => setSelectedFilter("Low Price")}>Low Price</button>
          <button onClick={() => setSelectedFilter("High Ratings")}>High Ratings</button>
        </div>
        <div className="sorting">
          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="Relevance">Relevance</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Ratings: High to Low">Ratings: High to Low</option>
            <option value="Delivery Time: Low to High">Delivery Time: Low to High</option>
          </select>
        </div>
      </div>

      {/* Offers Section */}
      <div className="offers">🔥 Exclusive Deals: Get 20% OFF on Your First Order! 🔥</div>

      {/* Categories List */}
      <div className="categories-container">
        {filteredCategories.length === 0 ? (
          <p>No categories available</p>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.idCategory}
              className="category-card"
              onClick={() => onSelectCategory(category.strCategory)}
            >
              <img src={category.strCategoryThumb} alt={category.strCategory} />
              <p>{category.strCategory}</p>
            </div>
          ))
        )}
      </div>

      {/* View Cart Button - Fixed */}
      <button className="view-cart" onClick={() => setPage("cart")}>
        View Cart ({cartItems?.length || 0}) {/* Show cart count */}
      </button>
    </div>
  );
};

export default FoodCategories;
