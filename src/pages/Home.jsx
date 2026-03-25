import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const signals = [
  {
    label: "Editorial layout",
    copy: "Structured to feel closer to a publishing product than a generic developer landing page.",
  },
  {
    label: "Faster discovery",
    copy: "Projects, writing, and contact pathways are visible immediately without hiding the value behind menus.",
  },
  {
    label: "Client-ready framing",
    copy: "Every section pushes visitors toward credibility, proof, or action.",
  },
];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const [projectsResponse, blogsResponse] = await Promise.all([
          api.get("/projects"),
          api.get("/blogs"),
        ]);
        setProjects(projectsResponse.data ?? []);
        setPosts(blogsResponse.data ?? []);
      } catch (error) {
        console.error("Failed to load homepage content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  const featuredProjects = projects.slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  return (
    <main className="layout py-10 sm:py-14">
      <section className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="panel px-6 py-8 sm:px-8 sm:py-10">
          <span className="eyebrow">Modern portfolio publication</span>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold tracking-tight text-ink-950 sm:text-6xl">
            A homepage that feels like a studio journal, not a template.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink-800/85 sm:text-lg">
            Designed to blend the clarity of modern publishing software with
            the confidence of a product case-study site, so visitors can scan
            your work, your writing, and your contact pathways in one flow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="button-primary">
              Explore Projects
            </Link>
            <Link to="/blogs" className="button-secondary">
              Read the Journal
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-ink-950 px-5 py-5 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                Projects
              </p>
              <p className="mt-3 font-display text-4xl">
                {loading ? "--" : String(projects.length).padStart(2, "0")}
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 px-5 py-5">
              <p className="text-xs uppercase tracking-[0.3em] text-ink-800/60">
                Articles
              </p>
              <p className="mt-3 font-display text-4xl text-ink-950">
                {loading ? "--" : String(posts.length).padStart(2, "0")}
              </p>
            </div>
            <div className="rounded-3xl bg-mint-300/45 px-5 py-5">
              <p className="text-xs uppercase tracking-[0.3em] text-ink-800/60">
                Contact
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-950">
                Open for projects, collaborations, and thoughtful product work.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="panel overflow-hidden p-6">
            <div className="rounded-[24px] bg-[linear-gradient(135deg,#11233b_0%,#1d3557_38%,#46ddb6_100%)] p-6 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-white/75">
                Design direction
              </p>
              <p className="mt-4 font-display text-3xl leading-tight">
                Editorial density with startup-product energy.
              </p>
              <p className="mt-4 text-sm leading-7 text-white/80">
                Borrowing from the best of creator tools without losing your own
                voice.
              </p>
            </div>
          </div>
          {signals.map((item) => (
            <article key={item.label} className="feature-card">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ink-800/60">
                {item.label}
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-950">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Selected Work</span>
            <h2 className="section-title mt-4">Projects framed like case files</h2>
          </div>
          <Link to="/projects" className="button-secondary">
            View All Projects
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project, index) => (
              <article key={project._id} className="feature-card">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.28em] text-ink-800/60">
                    Case {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-ink-950">
                    Shipping
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink-950">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-800/80">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.url_1}
                    target="_blank"
                    rel="noreferrer"
                    className="button-primary"
                  >
                    Open Live
                  </a>
                  <Link
                    to={`/projects/${project._id}`}
                    className="button-secondary"
                  >
                    View Detail
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="panel p-6 text-sm text-ink-800/80 lg:col-span-3">
              Add a few projects in the CMS and this section will immediately
              turn into a featured work shelf.
            </div>
          )}
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <span className="eyebrow">Journal</span>
          <h2 className="section-title mt-4">
            Blog entries designed for repeat reading
          </h2>
          <p className="section-copy mt-4">
            The blog page is positioned like a publication archive, with strong
            summaries, dates, and clear reading paths that help content feel
            worth following over time.
          </p>
          <Link to="/blogs" className="button-primary mt-6">
            Visit the Blog
          </Link>
        </div>
        <div className="grid gap-4">
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <Link
                key={post._id}
                to={`/blogs/${post._id}`}
                className="panel block p-6 transition duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-rose-300/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-950">
                    New post
                  </span>
                  <span className="text-xs uppercase tracking-[0.22em] text-ink-800/60">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink-950">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-800/80">
                  {post.summary}
                </p>
              </Link>
            ))
          ) : (
            <div className="panel p-6 text-sm text-ink-800/80">
              Once blog posts exist in the CMS, they will appear here as a
              living archive.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
