import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Mpesapayment = () => {
  const location = useLocation();
  const { product, cart } = location.state || {};

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Calculate total from cart if not a single product
  const computedCartTotal = cart
    ? cart.reduce((sum, item) => sum + item.product_cost * item.quantity, 0)
    : 0;

  const amountToPay = product?.product_cost ?? computedCartTotal;

  useEffect(() => {
    console.log("Product:", product);
    console.log("Cart:", cart);
    console.log("Computed Total:", computedCartTotal);
    console.log("Amount to Pay:", amountToPay);
  }, [product, cart]);

  const submit = async (e) => {
    e.preventDefault();

    if (!/^254\d{9}$/.test(phone)) {
      setMessage("Invalid phone number. Format: 2547XXXXXXXX");
      return;
    }

    if (!amountToPay || amountToPay <= 0) {
      setMessage("Invalid total amount. Cannot proceed.");
      return;
    }

    setMessage("Please wait as we process your payment...");

    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", amountToPay);
      data.append(
        "description",
        product
          ? `Payment for ${product.product_name}`
          : "Payment for multiple items in cart"
      );

      const response = await axios.post(
        "https://Meshsetek.pythonanywhere.com/api/mpesa_payment",
        data
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Payment error:", error);
      const errMsg =
        error.response?.data?.message || "Payment failed. Please try again.";
      setMessage(errMsg);
    }
  };

  return (
    <div className="row justify-content-center mt-3 mb-3">
      <h1 className="text-danger">Lipa na Mpesa</h1>
      <div className="col-md-6 card shadow p-3">
        <b className="text-success">{message}</b>

        {product && (
          <>
            <h4>
              Product Name:{" "}
              <span className="text-primary">{product.product_name}</span>
            </h4>
            <h4>
              Price of the Product:{" "}
              <span className="text-primary">Ksh. {product.product_cost}</span>
            </h4>
          </>
        )}

        {cart && (
          <>
            <h4>Items in Cart:</h4>
            <ul>
              {cart.map((item) => (
                <li key={item.product_id}>
                  {item.product_name} - Qty: {item.quantity} - Subtotal: Ksh.{" "}
                  {item.product_cost * item.quantity}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Always show total to pay */}
        <h4>
          <span className="text-primary">Total to Pay: Ksh. {amountToPay}</span>
        </h4>

        <form onSubmit={submit}>
          <input
            type="number"
            placeholder="Enter M-Pesa No. 254*********"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            required
          />
          <br />
          <button
            className="btn btn-success"
            disabled={message.includes("Please wait")}
          >
            Make Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Mpesapayment;
