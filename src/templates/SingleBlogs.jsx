import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import EditBlogButton from "../components/buttons/EditBlogButton.jsx";
import MotionReveal from "../components/MotionReveal.jsx";

export default function SingleBlogs() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await api.get(`/blogs/${blogId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err.response?.data?.message);
      }
    };
    getBlog();
  }, [blogId, token]);

  if (!blog) return <p className="mt-10 text-center text-slate-200">Loading...</p>;

  return (
    <main className="layout section-space">
      <MotionReveal>
      <article className="mx-auto max-w-4xl rounded-lg border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-300">
          Blog Detail
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
          {blog.title}
        </h1>
        <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-200/56">
          Posted on: {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <p className="mt-8 text-base leading-8 text-slate-200/78">
          {blog.summary}
        </p>
        <div className="mt-6">
          <EditBlogButton navigate={navigate} blogId={blogId} />
        </div>
      </article>
      </MotionReveal>
    </main>
  );
}
