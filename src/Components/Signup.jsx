import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(" Processing, please wait...");
    setSuccess("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);

      const response = await axios.post(
        "https://meshsetek.pythonanywhere.com/api/signup",
        formData
      );
      setLoading("");
      setSuccess("✅ " + (response.data.Success || "Signup successful!"));
      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      setLoading("");
      setSuccess("");
      setError(
        "❌ " +
          (error.response?.data?.message ||
            error.message ||
            "Something went wrong!")
      );
    }
  };

  return (
    <div className="row justify-content-center mt-4 mb-4">
      <div className="col-md-4 card shadow p-4 bg-secondary">
        <h1 className="text-center">Sign Up</h1>

        {loading && <p className="text-dark">{loading}</p>}
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <input
            type="text"
            placeholder=" Enter Username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          {/* Email input */}
          <input
            type="email"
            placeholder=" Enter Email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          {/* Phone input */}
          <input
            type="tel"
            placeholder=" Enter Phone Number"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />

          {/* Password input with eye icon */}
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="input-group-text bg-white"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </span>
          </div>
          <br />

          {/* Submit button */}
          <button type="submit" className="btn fw-bold px-4 py-2">
            Sign Up
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
