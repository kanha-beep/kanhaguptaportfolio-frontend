import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.jsx";
import "./styles/app.css";

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  clerkPublishableKey ? (
    <ClerkProvider publishableKey={clerkPublishableKey}>{app}</ClerkProvider>
  ) : app,
);
