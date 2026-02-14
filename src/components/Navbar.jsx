import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  console.log("value: ", isLoggedIn);
  const handleLogout = async () => {
    try {
      const res = await api.post("/auth/logout");
      console.log("logged out: ", res?.data);
      setIsLoggedIn(false);
      navigate("/");
    } catch (e) {
      console.log("error logout: ", e?.response?.data);
    }
  };
  return (
    <nav style={{ background: "#222" }} className="p-1 text-white">
      <Link to="/" style={{ margin: "0 1rem", color: "#fff" }}>
        Home
      </Link>
      <Link to="/about" style={{ margin: "0 1rem", color: "#fff" }}>
        About
      </Link>
      <Link to="/projects" style={{ margin: "0 1rem", color: "#fff" }}>
        Projects
      </Link>
      <Link to="/blogs" style={{ margin: "0 1rem", color: "#fff" }}>
        Blog
      </Link>
      <Link to="/contacts" style={{ margin: "0 1rem", color: "#fff" }}>
        Contact
      </Link>
      <Link to="/cms" style={{ margin: "0 1rem", color: "#fff" }}>
        CMS
      </Link>
      {isLoggedIn ? (
        <Link
          onClick={handleLogout}
          style={{ margin: "0 1rem", color: "#fff" }}
        >
          Logout
        </Link>
      ) : null}
    </nav>
  );
}
