import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import GetProducts from "./Components/GetProducts";
import AddProduct from "./Components/AddProduct";
import Payment from "./Components/Payment";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
import { CartProvider, useCart } from "./Components/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// 🔐 ProtectedRoute Component
const ProtectedRoute = ({ element }) => {
  const isLoggedIn = !!localStorage.getItem("userToken");
  return isLoggedIn ? element : <Navigate to="/signin" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
};

const AppContent = () => {
  const { cartItems } = useCart();
  const isLoggedIn = !!localStorage.getItem("userToken");
  const userName = localStorage.getItem("userName"); // Get the username from localStorage

  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    navigate("/signin"); // Redirect to signin after logout
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Bag~Fluence Africa</h1>
        <nav className="nav-links">
          <Link className="link" to="/getproducts">
            Home
          </Link>
          {!isLoggedIn && (
            <Link className="link" to="/signup">
              Signup
            </Link>
          )}
          {!isLoggedIn && (
            <Link className="link" to="/signin">
              Signin
            </Link>
          )}
          {isLoggedIn && (
            <>
              <Link className="link" to="/addproduct">
                Upload~item
              </Link>
              <span className="link">👤 {userName}</span>{" "}
              {/* Display username */}
              <button className="link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          <Link className="link" to="/cart">
            Cart 🛒 <span>({cartItems.length})</span>
          </Link>
        </nav>
      </header>

      {/* 🚦 Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/getproducts" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/getproducts" element={<GetProducts />} />

        {/* 🔒 Protected Routes */}
        <Route
          path="/addproduct"
          element={<ProtectedRoute element={<AddProduct />} />}
        />
        <Route
          path="/payment"
          element={<ProtectedRoute element={<Payment />} />}
        />

        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />

      {/* 🎨 Inline Styles */}
      <style>
        {`
  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    background: #f4f4f4;
    color: #333;
  }

  .app-container {
   background: linear-gradient(to right, #1c1c1c, #3a3a3a);
    min-height: 100vh;
    color: #fdfdfd;
    padding: 30px 15px;
    display: flex;
    flex-direction: column;
  }

  .app-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .app-header h1 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1rem;
    text-shadow: 0px 1px 5px rgba(0,0,0,0.2);
  }

  .nav-links {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .link {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.12);
    text-decoration: none;
    font-size: 1rem;
    padding: 10px 20px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .link:hover {
    background-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-1px);
  }

  .logout-btn {
    background-color: #ff4d4f;
    border: none;
    font-size: 1rem;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .logout-btn:hover {
    background-color: #d9363e;
  }

  .logout-btn:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #d9363e;
  }

  .welcome-text {
    margin-left: 10px;
    font-weight: 500;
    color: #fff;
  }

  /* Responsive Styles */
  @media (max-width: 768px) {
    .app-header h1 {
      font-size: 2rem;
    }
    .nav-links {
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
    .link, .logout-btn {
      width: 90%;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    .app-header h1 {
      font-size: 1.5rem;
    }
    .link, .logout-btn {
      font-size: 0.95rem;
      padding: 10px 12px;
    }
  }
`}
      </style>
    </div>
  );
};

export default App;
