import React from "react";
import { useCart } from "../Components/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    getTotalPrice,
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="container mt-4 text-light">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>No items in cart.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/getproducts")}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div key={item.product_id} className="col-md-4 mb-4">
                <div className="card bg-secondary text-white p-3">
                  <img
                    src={`https://meshsetek.pythonanywhere.com/static/images/${item.product_photo}`}
                    alt={item.product_name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <h5>{item.product_name}</h5>
                  <p>{item.product_description.slice(0, 50)}...</p>
                  <b>Ksh. {item.product_cost}</b>
                  <div className="mt-2">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => decreaseQty(item.product_id)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => increaseQty(item.product_id)}
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-2">
                    Subtotal:{" "}
                    <b className="text-warning">
                      Ksh. {item.product_cost * item.quantity}
                    </b>
                  </p>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-info mt-2 ms-2"
                    onClick={() =>
                      navigate("/payment", { state: { product: item } })
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h4 className="mt-3 text-success">
            Total Price: Ksh. {getTotalPrice()}
          </h4>

          <button
            className="btn btn-success mt-2 me-2"
            onClick={() => navigate("/payment", { state: { cart: cartItems } })}
          >
            Buy All
          </button>
          <br />

          <button className="btn btn-warning mt-2" onClick={clearCart}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
