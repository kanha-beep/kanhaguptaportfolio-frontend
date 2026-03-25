import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blogs", label: "Blog" },
  { to: "/contacts", label: "Contact" },
  { to: "/cms", label: "CMS" },
];

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log("error logout: ", error?.response?.data);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="layout pt-4">
        <nav className="panel flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <NavLink
            to="/"
            className="font-display text-lg font-semibold tracking-[0.2em] text-ink-950 uppercase"
          >
            Portfolio OS
          </NavLink>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-950/10 bg-white/80 text-ink-950 md:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? "x" : "="}
          </button>

          <div
            className={`${isOpen ? "flex" : "hidden"} w-full flex-col gap-3 md:flex md:w-auto md:flex-row md:items-center md:gap-2`}
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-ink-950 text-white"
                      : "text-ink-800 hover:bg-white/80",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-ink-950/15 px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-white"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/auth" className="button-primary">
                Sign In
              </NavLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
