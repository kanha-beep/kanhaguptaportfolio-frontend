import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api";
import { siteContent } from "../content/siteContent";

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
    <header id="top" className="fixed inset-x-0 top-0 z-50 bg-surface-950/70 backdrop-blur-xl">
      <div className="layout">
        <nav className="flex flex-wrap items-center justify-between gap-4 py-5">
          <NavLink
            to="/"
            className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-white"
          >
            {siteContent.brand}
          </NavLink>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/12 bg-white/6 text-white md:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? "x" : "="}
          </button>

          <div
            className={`${isOpen ? "flex" : "hidden"} w-full flex-col gap-3 rounded-[20px] border border-white/8 bg-[#0d1325]/92 p-4 md:flex md:w-auto md:flex-row md:items-center md:gap-2 md:rounded-full md:border md:border-white/8 md:bg-white/4 md:p-2`}
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-full px-5 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-[#2a66ff] text-white shadow-[0_10px_30px_rgba(42,102,255,0.32)]"
                      : "text-slate-200 hover:bg-white/8",
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
                className="rounded-full border border-white/16 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/8"
              >
                Logout
              </button>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
