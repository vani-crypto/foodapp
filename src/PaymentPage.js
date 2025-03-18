import React, { useState } from "react";
import "./styles.css";

const PaymentPage = ({ goToOrders, totalAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiOption, setUpiOption] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [address, setAddress] = useState({
    name: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handlePayment = () => {
    if (!totalAmount || totalAmount <= 0) {
      alert("⚠️ No items in the cart!");
      return;
    }
    if (!address.name || !address.contact || !address.street || !address.city || !address.pincode) {
      alert("⚠️ Please fill in all address details!");
      return;
    }

    if (paymentMethod === "cod") {
      alert("💵 Pay during delivery time.");
    } else {
      alert(`✅ Payment of ₹${totalAmount} Successful! Your order will be delivered soon! 🚀`);
    }
    goToOrders();
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">💳 Secure Payment</h2>
      <div className="section">
        <h3>📍 Delivery Address</h3>
        <div className="input-group">
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} required />
        </div>
        <div className="input-group">
          <label>Contact Number:</label>
          <input type="tel" placeholder="Enter your phone number" value={address.contact} onChange={(e) => setAddress({ ...address, contact: e.target.value })} required />
        </div>
        <div className="input-group">
          <label>Street Address:</label>
          <input type="text" placeholder="Enter your street address" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} required />
        </div>
        <div className="input-group">
          <label>City:</label>
          <input type="text" placeholder="Enter your city" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
        </div>
        <div className="input-group">
          <label>Pincode:</label>
          <input type="text" placeholder="Enter your pincode" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} required />
        </div>
      </div>
      <div className="section">
        <h3>💰 Payment Details</h3>
        <div className="input-group">
          <label>Amount to Pay:</label>
          <input type="number" value={totalAmount} disabled />
        </div>
        <label>Choose Payment Method:</label>
        <div className="payment-options">
          <button onClick={() => setPaymentMethod("upi")}>UPI</button>
          <button onClick={() => setPaymentMethod("cards")}>Cards</button>
          <button onClick={() => setPaymentMethod("netbanking")}>Net Banking</button>
          <button onClick={() => setPaymentMethod("cod")}>Cash on Delivery</button>
        </div>
        {paymentMethod === "upi" && (
          <div className="input-group">
            <label>Select UPI Option:</label>
            <select value={upiOption} onChange={(e) => setUpiOption(e.target.value)} required>
              <option value="">-- Select UPI --</option>
              <option value="gpay">Google Pay</option>
              <option value="phonepe">PhonePe</option>
              <option value="paytm">Paytm</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        )}
        {paymentMethod === "cards" && (
          <div className="card-details">
            <div className="input-group">
              <label>Card Number:</label>
              <input type="text" placeholder="Enter card number" value={cardDetails.cardNumber} onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} required />
            </div>
            <div className="input-group">
              <label>Expiry Date:</label>
              <input type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} required />
            </div>
            <div className="input-group">
              <label>CVV:</label>
              <input type="password" placeholder="***" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} required />
            </div>
          </div>
        )}
        {paymentMethod === "netbanking" && (
          <div className="input-group">
            <label>Select Your Bank:</label>
            <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} required>
              <option value="">-- Select Bank --</option>
              <option value="SBI">State Bank of India</option>
              <option value="HDFC">HDFC Bank</option>
              <option value="ICICI">ICICI Bank</option>
              <option value="Axis">Axis Bank</option>
              <option value="Kotak">Kotak Mahindra Bank</option>
              <option value="Others">Other Banks</option>
            </select>
          </div>
        )}   
        {paymentMethod === "cod" && (
          <p className="cod-message">💵 Pay during delivery time.</p>
        )}
      </div>
      <button className="pay-now-btn" onClick={handlePayment}>Pay Now 💰</button>
    </div>
  );
};

export default PaymentPage;
