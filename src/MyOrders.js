import React, { useState, useEffect } from "react";
import "./styles.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) => res.json()),
      fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) => res.json()),
      fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) => res.json()),
      fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) => res.json()),
      fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) => res.json())
    ])
      .then((responses) => {
        const fetchedOrders = responses.flatMap((data, index) =>
          data.meals.map((meal) => ({
            id: index + 1,
            name: meal.strMeal,
            price: Math.floor(Math.random() * 300) + 100,
            status: index % 2 === 0 ? "Delivered" : "Out for Delivery",
            image: meal.strMealThumb,
            orderDate: "2024-03-10",
            paymentMethod: "UPI",
            estimatedDelivery: index % 2 === 0 ? "Delivered on time" : "Arriving soon",
            deliveryAddress: "123, Random Street, City"
          }))
        );
        setOrders(fetchedOrders);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmitRating = () => {
    if (!currentRating) {
      alert("Please select a rating before submitting!");
      return;
    }
    setRatings({ ...ratings, [selectedOrder.id]: { rating: currentRating, feedback } });
    setSelectedOrder(null);
    setCurrentRating(0);
    setFeedback("");
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">📦 My Orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <img
              src={order.image}
              alt={order.name}
              className="food-image"
              onClick={() => setSelectedOrder(order)}
            />
            <div className="order-details-text">
              <p className="order-name">{order.name}</p>
              <p className="order-status">Status: {order.status}</p>
              <p className="order-price">₹{order.price}</p>
              {ratings[order.id] && (
                <p className="order-rating">⭐ {ratings[order.id].rating} - {ratings[order.id].feedback}</p>
              )}
            </div>
            <button className="rate-btn" onClick={() => setSelectedOrder(order)}>Rate this Item ⭐</button>
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <div className="order-popup">
          <div className="order-popup-content">
            <h3>📍 Order Details</h3>
            <p><strong>{selectedOrder.name}</strong></p>
            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
            <p><strong>Estimated Delivery:</strong> {selectedOrder.estimatedDelivery}</p>
            <p><strong>Current Status:</strong> {selectedOrder.status}</p>
            <p><strong>Delivery Address:</strong> {selectedOrder.deliveryAddress}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
            <p><strong>Amount Paid:</strong> ₹{selectedOrder.price}</p>

            <h4>Rate this Order</h4>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setCurrentRating(star)}
                  className={currentRating >= star ? "star selected" : "star"}
                >
                  ⭐
                </span>
              ))}
            </div>

            <select className="feedback-dropdown" value={feedback} onChange={(e) => setFeedback(e.target.value)}>
              <option value="">Select Feedback</option>
              <option value="Bad">Bad</option>
              <option value="Okay">Okay</option>
              <option value="Good">Good</option>
              <option value="Better">Better</option>
              <option value="Excellent">Excellent</option>
            </select>

            <button className="submit-btn" onClick={handleSubmitRating}>Submit</button>
            <button className="close-btn" onClick={() => setSelectedOrder(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders; 