import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { siteContent } from "../content/siteContent";
import MotionReveal from "../components/MotionReveal.jsx";
import MotionCard from "../components/MotionCard.jsx";

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
    <main className="layout section-space">
      <MotionReveal>
      <section className="glass-card px-3 py-4 sm:px-4 sm:py-5">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* <div>
            <h1 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Writing in the same polished visual system.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200/82 sm:text-lg">
              Blogs now match the same dark theme, sizing, spacing, and card
              styling as the portfolio reference, while your own writing stays
              the only thing changing.
            </p>
          </div> */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {[siteContent.role, siteContent.location, siteContent.availability].map(
              (label, index) => (
                <MotionCard key={label} index={index}>
                <div className="rounded-lg border border-white/10 bg-white/6 p-3">
                  <p className="text-xs uppercase tracking-[0.28em] text-accent-300">
                    Shelf {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-display text-2xl text-white">
                    {label}
                  </p>
                </div>
                </MotionCard>
              ),
            )}
          </div>
        </div>
      </section>
      </MotionReveal>

      <MotionReveal className="mt-14">
      <section className="grid gap-5">
        {loading ? (
          <div className="glass-card p-6 text-sm text-slate-200/80">
            Loading your publication archive...
          </div>
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <MotionCard key={post._id} index={index}>
            <Link
              to={`/blogs/${post._id}`}
              className="glass-card block overflow-hidden p-6"
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
            </MotionCard>
          ))
        ) : (
          <div className="glass-card p-6 text-sm text-slate-200/80">
            There are no blog posts yet. Add a post in the CMS and this page
            will populate automatically.
          </div>
        )}
      </section>
      </MotionReveal>
    </main>
  );
}
