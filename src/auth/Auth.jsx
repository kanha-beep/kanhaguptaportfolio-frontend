import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Auth({ setIsLoggedIn, setUser, checkAuthStatus }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from ?? "/cms";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await api.post("/auth/login", formData);
      setIsLoggedIn(true);
      setUser(res?.data);
      await checkAuthStatus();
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setUser(null);
      setError(err?.response?.data?.message ?? "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-white/10 bg-white/5 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)] sm:px-8 sm:py-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-300">CMS Access</span>
            <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Sign in to manage projects and blogs.
            </h1>
            {/* <p className="mt-5 text-base leading-8 text-slate-200/82 sm:text-lg">
              Use your admin account to update live portfolio entries, project
              links, and blog content without changing the public layout.
            </p> */}
            <div className="mt-8 space-y-3 text-sm leading-7 text-slate-300/76">
              <p>Keep project links current.</p>
              <p>Update CMS entries in the same structure.</p>
              <p>Return directly to the page you were trying to open.</p>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)] sm:px-8 sm:py-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-300">
                  Admin Login
                </p>
                <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">
                  Welcome back
                </h2>
              </div>
              <Link to="/" className="inline-flex items-center justify-center rounded-md border border-white/16 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent-400/40 hover:bg-white/10">
                Back Home
              </Link>
            </div>

            {error ? (
              <div className="mt-6 rounded-lg border border-rose-200/30 bg-rose-200/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} autoComplete="off" className="mt-8 space-y-5">
              <input
                type="text"
                name="fake-username"
                autoComplete="username"
                className="hidden"
                tabIndex="-1"
                aria-hidden="true"
              />
              <input
                type="password"
                name="fake-password"
                autoComplete="new-password"
                className="hidden"
                tabIndex="-1"
                aria-hidden="true"
              />

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-200/40 focus:border-accent-400/50 focus:bg-white/8"
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-200/40 focus:border-accent-400/50 focus:bg-white/8"
                  autoComplete="new-password"
                  required
                />
              </div>

              <button type="submit" className="inline-flex items-center justify-center rounded-md bg-accent-500 px-5 py-3 text-sm font-semibold text-surface-950 transition hover:bg-accent-400" disabled={submitting}>
                {submitting ? "Signing In..." : "Login"}
              </button>
            </form>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
