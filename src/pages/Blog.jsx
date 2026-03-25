import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const filters = ["Latest essays", "Product notes", "Build logs"];

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
    <main className="layout py-10 sm:py-14">
      <section className="panel px-6 py-8 sm:px-8 sm:py-10">
        <span className="eyebrow">Publication archive</span>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="font-display text-5xl font-semibold tracking-tight text-ink-950 sm:text-6xl">
              Writing with a cleaner magazine rhythm.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink-800/85 sm:text-lg">
              This page borrows the strongest parts of modern creator platforms:
              clear post cards, visible recency, and summaries that help readers
              decide quickly what deserves their time.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {filters.map((label, index) => (
              <div key={label} className="rounded-[24px] bg-white/80 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-ink-800/60">
                  Shelf {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 font-display text-2xl text-ink-950">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-5">
        {loading ? (
          <div className="panel p-6 text-sm text-ink-800/80">
            Loading your publication archive...
          </div>
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <Link
              key={post._id}
              to={`/blogs/${post._id}`}
              className="panel block overflow-hidden p-6 transition duration-300 hover:-translate-y-1"
            >
              <div className="grid gap-6 lg:grid-cols-[0.2fr_1fr_0.28fr] lg:items-start">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-800/55">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="font-display text-3xl font-semibold text-ink-950">
                    {post.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-ink-800/80 sm:text-base">
                    {post.summary}
                  </p>
                </div>
                <div className="flex flex-col gap-3 text-sm text-ink-800/70 lg:items-end">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span className="rounded-full bg-mint-300/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-950">
                    Read note
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="panel p-6 text-sm text-ink-800/80">
            There are no blog posts yet. Add a post in the CMS and this page
            will populate automatically.
          </div>
        )}
      </section>
    </main>
  );
}
