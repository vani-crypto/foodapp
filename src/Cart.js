import React, { useState, useEffect } from "react";
import "./Cart.css";

const Cart = ({ cartItems, setCartItems, addMoreItems, setPage }) => {  
  const [note, setNote] = useState("");
  const [suggestedFoods, setSuggestedFoods] = useState([]);

  useEffect(() => {
    Promise.all(
      Array.from({ length: 6 }).map(() =>
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
          .then((response) => response.json())
          .then((data) => data.meals?.[0])
      )
    )
      .then((meals) => {
        setSuggestedFoods(
          meals.map((meal) => ({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            price: Math.floor(Math.random() * 300) + 100,
          }))
        );
      })
      .catch((error) => console.error("Error fetching suggested foods:", error));
  }, []);

  const updateCart = (item, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter((cartItem) => cartItem.idMeal !== item.idMeal));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.idMeal === item.idMeal ? { ...cartItem, quantity: newQuantity } : cartItem
        )
      );
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  // ✅ Fix: Check if setPage exists before calling it
  const handlePlaceOrder = () => {
    if (setPage) {
      setPage("payment");  
    } else {
      console.error("setPage is not provided");
    }
  };

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty. Add some delicious food! 🍽️</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.idMeal} className="cart-item">
            <img src={item.strMealThumb} alt={item.strMeal} />
            <div className="cart-details">
              <h3>{item.strMeal}</h3>
              <p>Price: ₹ {item.price * item.quantity}</p>
            </div>
            <div className="quantity-control">
              <button onClick={() => updateCart(item, item.quantity - 1)} disabled={item.quantity === 1}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateCart(item, item.quantity + 1)}>+</button>
              <button className="edit-btn" onClick={() => updateCart(item, 0)}>
                🗑️ Remove
              </button>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="note-section">
          <h4>Add a Note for the Restaurant</h4>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="E.g., Less spicy, No onions..."
          />
        </div>
      )}

      <div className="suggestions">
        <h4>🍽️ You Might Also Like</h4>
      </div>

      <div className="suggested-foods">
        {suggestedFoods.map((food) => (
          <div key={food.idMeal} className="suggested-item">
            <img src={food.strMealThumb} alt={food.strMeal} />
            <h4>{food.strMeal}</h4>
            <p>₹ {food.price}</p>
            <button onClick={() => setCartItems([...cartItems, { ...food, quantity: 1 }])}>
              + Add to Cart
            </button>
          </div>
        ))}
        <div className="suggested-item add-more-card" onClick={addMoreItems}>
          <h4
            style={{
              fontSize: "3rem",
              textAlign: "center",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            +
          </h4>
        </div>
      </div>

      <div className="coupon-section">
        <h4>🎟️ Apply Coupon</h4>
        <input type="text" placeholder="Enter Coupon Code" />
        <button>Apply</button>
      </div>

      {cartItems.length > 0 && (
        <div className="summary">
          <p>🚀 Delivery in 30-40 mins</p>
          <h3>Total: ₹ {totalPrice.toFixed(2)}</h3>
          <button className="place-order" onClick={handlePlaceOrder}>
            📦 Place Order
          </button>
        </div>
      )}

      <div className="cancellation-policy">
        <h4>🚫 Cancellation Policy</h4>
        <p>Help us reduce food waste by avoiding cancellations.</p>
      </div>
    </div>
  );
};

export default Cart;
