import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AssistantBar from "./components/AssistantBar.jsx";
import ChatbotWidget from "./components/ChatbotWidget.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Blog from "./pages/Blog.jsx";
import EditBlogs from "./templates/EditBlogs.jsx";
import SingleBlogs from "./templates/SingleBlogs.jsx";
import CMSHome from "./cms/CMSHome.jsx";
import CMSProjects from "./cms/CMSProjects.jsx";
import CMSBlog from "./cms/CMSBlog.jsx";
import Auth from "./auth/Auth.jsx";
import Logout from "./auth/Logout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SingleProjects from "./templates/SingleProjects.jsx";
import EditProjects from "./templates/EditProjects.jsx";
import api from "./api.js";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [portfolioProfileImage, setPortfolioProfileImage] = useState("");
  const [error, setError] = useState("");
  const { pathname, hash } = useLocation();

  const checkAuthStatus = async () => {
    setAuthLoading(true);
    try {
      const res = await api.get("/auth/me");
      setUser(res?.data);
      if (res) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      if (error?.response?.status && error.response.status !== 401) {
        console.log(
          "auth status error",
          error?.response?.data ?? error.message,
        );
      }
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const fetchPortfolioProfile = async () => {
      try {
        const res = await api.get("/auth/portfolio-profile");
        setPortfolioProfileImage(res?.data?.profileImage ?? "");
      } catch (error) {
        console.log(
          "portfolio profile fetch error",
          error?.response?.data ?? error.message,
        );
      }
    };

    fetchPortfolioProfile();
  }, []);

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);

      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, left: 0, behavior: "smooth" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden pt-5 before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] before:bg-[length:54px_54px] before:content-[''] before:[mask-image:linear-gradient(180deg,rgba(0,0,0,0.8),transparent_92%)]">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<Home profileImage={portfolioProfileImage} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/projects"
            element={<Projects error={error} setError={setError} />}
          />
          <Route path="/projects/:projectsId" element={<SingleProjects />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:blogId" element={<SingleBlogs />} />
          <Route
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                authLoading={authLoading}
              />
            }
          >
            <Route
              path="/projects/:projectsId/edit"
              element={<EditProjects />}
            />
            <Route path="/blogs/:blogId/edit" element={<EditBlogs />} />
            {pathname !== "/contacts" && (
              <Route path="/cms" element={<CMSHome />} />
            )}
            {pathname !== "/contacts" && (
              <Route path="/cms/projects" element={<CMSProjects />} />
            )}
            {pathname !== "/contacts" && (
              <Route path="/cms/blogs" element={<CMSBlog />} />
            )}
          </Route>
          <Route
            path="/auth"
            element={
              <Auth
                setIsAuth={setIsAuth}
                isAuth={isAuth}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                setUser={setUser}
                checkAuthStatus={checkAuthStatus}
              />
            }
          />
          <Route
            path="/logout"
            element={<Logout setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </div>
      {pathname !== "/contacts" && <Footer />}
      <ChatbotWidget profileImage={portfolioProfileImage} />
    </div>
  );
}

export default App;
