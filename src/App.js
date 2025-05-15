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
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

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
  const userName = localStorage.getItem("userName");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    navigate("/signin");
  };

  return (
    <div className="app-container">
      {/* Header with Navbar */}
      <header>
        <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/getproducts">
              Bag~Fluence Africa
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/getproducts">
                  Home
                </Nav.Link>
                {!isLoggedIn && (
                  <>
                    <Nav.Link as={Link} to="/signup">
                      Signup
                    </Nav.Link>
                    <Nav.Link as={Link} to="/signin">
                      Signin
                    </Nav.Link>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <Nav.Link as={Link} to="/addproduct">
                      Upload~item
                    </Nav.Link>
                    <Nav.Item className="nav-link text-white">
                      👤 {userName}
                    </Nav.Item>
                    <Nav.Item>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleLogout}
                        className="ms-2"
                      >
                        Logout
                      </Button>
                    </Nav.Item>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>

            {/* Cart icon always visible */}
            <Nav>
              <Nav.Link as={Link} to="/cart" className="text-white">
                🛒 Cart <span>({cartItems.length})</span>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>

      {/* 🚦 Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/getproducts" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/getproducts" element={<GetProducts />} />
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

      {/* Footer */}
      <Footer />

      {/* Optional Custom Styling */}
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
          padding-bottom: 50px;
        }

        .navbar-brand {
          font-weight: bold;
        }

        .nav-link {
          color: white !important;
        }

        .nav-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .navbar-collapse {
            background-color: #1c1c1c;
            padding: 1rem;
            border-radius: 10px;
          }
        }
      `}
      </style>
    </div>
  );
};

export default App;
