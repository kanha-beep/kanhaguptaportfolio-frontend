import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, authLoading }) {
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4 text-sm text-slate-300">
        Restoring your session...
      </div>
    );
  }

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" replace state={{ from: location.pathname }} />
  );
}
