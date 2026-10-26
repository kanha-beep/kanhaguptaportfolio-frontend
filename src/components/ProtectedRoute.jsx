import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/react";

function ClerkProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return <div className="flex min-h-[40vh] items-center justify-center px-4 text-sm text-slate-300">Restoring your session...</div>;
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/auth" replace state={{ from: location.pathname }} />;
}

export default function ProtectedRoute({ isLoggedIn, authLoading }) {
  if (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    return <ClerkProtectedRoute />;
  }
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
