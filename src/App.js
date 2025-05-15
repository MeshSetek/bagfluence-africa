import { Navbar, Nav, Container, Button } from "react-bootstrap";

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
      <header>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Bag~Fluence Africa</Navbar.Brand>
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
                      >
                        Logout
                      </Button>
                    </Nav.Item>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>

            {/* Cart is always visible, outside the toggle */}
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

      <Footer />
    </div>
  );
};
