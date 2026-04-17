import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const checkAuthStatus = async () => {
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
        console.log("auth status error", error?.response?.data ?? error.message);
      }
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <div className="page-shell flex min-h-screen flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/projects"
            element={<Projects error={error} setError={setError} />}
          />
          <Route path="/projects/:projectsId" element={<SingleProjects />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:blogId" element={<SingleBlogs />} />
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route
              path="/projects/:projectsId/edit"
              element={<EditProjects />}
            />
            <Route path="/blogs/:blogId/edit" element={<EditBlogs />} />
            <Route path="/cms" element={<CMSHome />} />
            <Route path="/cms/projects" element={<CMSProjects />} />
            <Route path="/cms/blogs" element={<CMSBlog />} />
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
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

export default App;
