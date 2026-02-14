import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Auth({ setIsLoggedIn, setUser, checkAuthStatus }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login starts");
    try {
      const res = await api.post("/auth/login", formData);
      console.log("login done: ", res?.data);
      setIsLoggedIn(true);
      setUser(res?.data);
      checkAuthStatus();
      return navigate("/", { replace: true });
    } catch (err) {
      console.log("login failed: ", err?.response);
      setUser(null);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      {/* <h2 className="text-center mb-3 btn btn-outline-primary">Login</h2> */}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <button className="btn btn-primary w-100 mt-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
