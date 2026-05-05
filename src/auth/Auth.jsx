import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api.js";
import MotionReveal from "../components/MotionReveal.jsx";

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
    <main className="layout section-space">
      <MotionReveal amount={0.12}>
        <section className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-card px-6 py-8 sm:px-8 sm:py-10">
            <span className="eyebrow">CMS Access</span>
            <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Sign in to manage projects and blogs.
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-200/82 sm:text-lg">
              Use your admin account to update live portfolio entries, project
              links, and blog content without changing the public layout.
            </p>
            <div className="mt-8 space-y-3 text-sm leading-7 text-slate-300/76">
              <p>Keep project links current.</p>
              <p>Update CMS entries in the same structure.</p>
              <p>Return directly to the page you were trying to open.</p>
            </div>
          </div>

          <div className="glass-card px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-300">
                  Admin Login
                </p>
                <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">
                  Welcome back
                </h2>
              </div>
              <Link to="/" className="button-secondary">
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
                  className="input-surface"
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
                  className="input-surface"
                  autoComplete="new-password"
                  required
                />
              </div>

              <button type="submit" className="button-primary" disabled={submitting}>
                {submitting ? "Signing In..." : "Login"}
              </button>
            </form>
          </div>
        </section>
      </MotionReveal>
    </main>
  );
}
