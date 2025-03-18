import React, { useState, useEffect } from "react";
import "./Wishlist.css"; // Add your styles

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = (idMeal) => {
    const updatedWishlist = wishlist.filter((item) => item.idMeal !== idMeal);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div key={item.idMeal} className="wishlist-item">
              <img src={item.strMealThumb} alt={item.strMeal} className="wishlist-img" />
              <h3 className="wishlist-name">{item.strMeal}</h3>
              <button className="remove-from-wishlist" onClick={() => removeFromWishlist(item.idMeal)}>
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
