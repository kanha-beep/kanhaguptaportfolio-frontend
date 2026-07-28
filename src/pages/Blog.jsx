import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { siteContent } from "../content/siteContent";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllBlogPosts = async () => {
      try {
        const res = await api.get("/blogs");
        setPosts(res.data ?? []);
      } catch (error) {
        console.log("get posts error", error?.response?.data);
      } finally {
        setLoading(false);
      }
    };

    getAllBlogPosts();
  }, []);

  return (
    <main className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
      
      <motion.div
        className="mt-14"
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="grid gap-5">
        {loading ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-sm text-slate-200/80 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)]">
            Loading your publication archive...
          </div>
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                to={`/blogs/${post._id}`}
                className="block overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)]"
              >
                <div className="grid gap-6 lg:grid-cols-[0.2fr_1fr_0.28fr] lg:items-start">
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h2 className="font-display text-3xl font-semibold text-white">
                      {post.title}
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200/78 sm:text-base">
                      {post.summary}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 text-sm text-slate-200/70 lg:items-end">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="rounded-md bg-accent-400/12 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
                      Read Note
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-[5rem] text-slate-200/80 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)]">
            There are no blog posts yet.
          </div>
        )}
        </section>
      </motion.div>
    </main>
  );
}
