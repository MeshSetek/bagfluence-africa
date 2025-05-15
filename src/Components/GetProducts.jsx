import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import { useCart } from "../Components/CartContext"; // Cart hook

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { addToCart } = useCart(); // Add to cart function
  const navigate = useNavigate();
  const img_url = "https://meshsetek.pythonanywhere.com/static/images/";

  const getProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://meshsetek.pythonanywhere.com/api/get_product_details"
      );
      setProducts(response.data);
    } catch (error) {
      setError("Failed to fetch products. Please try again.");
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_description
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container text-center">
      <h3 className="text-info mt-3">
        ✨ From Outfit to Outstanding — Powered by Bags 👜💫
      </h3>
      <Carousel />

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="form-control my-3 w-50 mx-auto"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Loading/Error Messages */}
      {loading && <p className="text-warning">Fetching products...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Display Products */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card shadow bg-secondary text-center p-3">
                <img
                  src={img_url + product.product_photo}
                  className="product_img mt-2"
                  alt={product.product_name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="text-light">{product.product_name}</h5>
                  <p className="text-light">
                    {product.product_description.slice(0, 50)}...
                  </p>
                  <b className="text-danger">Ksh. {product.product_cost}</b>
                  <div className="mt-2 d-flex flex-column gap-2">
                    <button
                      className="btn btn-outline-dark"
                      onClick={() =>
                        navigate("/payment", { state: { product } })
                      }
                    >
                      Purchase Now
                    </button>
                    <button
                      className="btn btn-outline-light"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-light">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default GetProducts;
