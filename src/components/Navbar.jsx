import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../api";
import { siteContent } from "../content/siteContent";

const desktopLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blogs", label: "Blog" },
  { to: "/contacts", label: "Contact" },
  { to: "/cms", label: "CMS" },
];

const mobileLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "Education" },
  { to: "/about", label: "About" },
  { to: "/blogs", label: "Blog" },
  { to: "/contacts", label: "Contact" },
  { to: "/cms", label: "CMS" },
];

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

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
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Disclosure as="nav" className="flex flex-wrap items-center justify-between gap-4 py-5">
          {({ open, close }) => (
            <>
              <NavLink
                to="/"
                className="font-display text-lg font-semibold uppercase tracking-[0.2em] text-white"
              >
                {siteContent.brand}
              </NavLink>

              <DisclosureButton
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/12 bg-white/6 text-white md:hidden"
                aria-label="Toggle navigation"
              >
                {open ? "x" : "="}
              </DisclosureButton>

              <div className="hidden w-auto flex-row items-center gap-2 rounded-full border border-white/8 bg-white/4 p-2 md:flex">
                {desktopLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
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
                    onClick={async () => {
                      await handleLogout();
                      close();
                    }}
                    className="rounded-full border border-white/16 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/8"
                  >
                    Logout
                  </button>
                ) : null}
              </div>

              <DisclosurePanel className="flex w-full flex-col gap-3 rounded-[20px] border border-white/8 bg-[#0d1325]/92 p-4 md:hidden">
                {mobileLinks.map((link) => (
                  <Link
                    key={`${link.label}-${typeof link.to === "string" ? link.to : "link"}`}
                    to={link.to}
                    onClick={() => close()}
                    className="rounded-full px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/8"
                  >
                    {link.label}
                  </Link>
                ))}
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={async () => {
                      await handleLogout();
                      close();
                    }}
                    className="rounded-full border border-white/16 px-5 py-2.5 text-left text-sm font-medium text-white transition hover:bg-white/8"
                  >
                    Logout
                  </button>
                ) : null}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>
    </header>
  );
}
