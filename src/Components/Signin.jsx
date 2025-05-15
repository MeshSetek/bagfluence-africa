import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ toggle

  // Feedback states
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("⏳ Processing, please wait...");
    setSuccess("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "https://meshsetek.pythonanywhere.com/api/signin",
        formData
      );
      setLoading("");

      if (response.data.user) {
        setSuccess("✅ " + response.data.Message);
        setError("");

        // Save user data to localStorage
        localStorage.setItem("userToken", response.data.user.token);
        localStorage.setItem("userName", response.data.user.username);

        navigate("/");
      } else {
        setSuccess("⚠️ " + response.data.Message);
      }
    } catch (error) {
      setLoading("");
      setSuccess("");
      setError("❌ " + error.Message);
    }
  };

  return (
    <div className="row justify-content-center mt-4 mb-4">
      <div className="col-md-4 card shadow p-4 bg-secondary">
        <h1 className="text-center text-white">Sign In</h1>

        {loading && <p className="text-dark">{loading}</p>}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <input
            type="email"
            placeholder="Enter Your Email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          {/* Password input with toggle */}
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="🔑 Enter Your Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
          </div>

          <br />
          <button className="btn btn-light w-100" type="submit">
            🔓 Sign In
          </button>
        </form>

        <p className="mt-3 text-center text-white">
          Don't have an account? <Link to="/signup">🚀 Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
