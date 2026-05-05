import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import AddBlogButton from "../components/buttons/AddBlogButton.jsx";
import DeleteBlogButton from "../components/buttons/DeleteBlogButton.jsx";
import ViewBlogButton from "../components/buttons/ViewBlogButton.jsx";

export default function CMSBlog() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", summary: "" });

  const handleChange = (e) => {
    setNewBlog((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const getAllBlogPosts = async () => {
      try {
        const res = await api.get("/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data ?? []);
      } catch (error) {
        console.log("error in get posts", error?.response?.data?.message);
      }
    };

    getAllBlogPosts();
  }, [token]);

  const handleAdd = async (event) => {
    event.preventDefault();

    if (!newBlog.title || !newBlog.summary) {
      return alert("Please enter details");
    }

    try {
      const res = await api.post("/blogs", newBlog, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((previous) => [...previous, res.data]);
      setNewBlog({ title: "", summary: "" });
    } catch (error) {
      console.log("error", error?.response?.data?.message);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Manage Blog Posts</h1>
      <section style={{ margin: "2rem 0" }}>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={newBlog.title}
            onChange={handleChange}
            className="form-control"
            required
          />
          <textarea
            placeholder="Post Summary"
            name="summary"
            value={newBlog.summary}
            onChange={handleChange}
            className="form-control mt-2"
            required
          />
          <AddBlogButton />
        </form>
      </section>
      <section>
        {blogs.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            <div className="d-flex">
              <DeleteBlogButton token={token} p={p} setBlogs={setBlogs} blogs={blogs} />
              <ViewBlogButton navigate={navigate} p={p} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
