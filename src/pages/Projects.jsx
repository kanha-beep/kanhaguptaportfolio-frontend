import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { siteContent } from "../content/siteContent";
import MotionReveal from "../components/MotionReveal.jsx";

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: index * 0.1,
    },
  }),
};

const imageVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.045,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants = {
  rest: { y: 0 },
  hover: {
    y: -6,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Projects({ error, setError }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get("/projects");
        setProjects(res?.data ?? []);
      } catch (fetchError) {
        console.log(
          "error in get projects",
          fetchError?.response?.data?.message,
        );
        setError(fetchError?.response?.data?.message ?? "Unable to load work.");
      } finally {
        setLoading(false);
      }
    };

    getAllProjects();
  }, [setError]);

  return (
    <main className="layout section-space">
      <MotionReveal>
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-card px-6 py-8 sm:px-8 sm:py-10">
          <span className="eyebrow">Featured Work</span>
          <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Projects presented in the same clean tech-portfolio frame.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200/82 sm:text-lg">
            This page keeps the same theme, section spacing, dark palette, and
            card proportions as the portfolio style you referenced, while your
            own live work stays at the center.
          </p>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-accent-300">
              Catalogue Size
            </p>
            <p className="mt-4 font-display text-5xl text-white">
              {loading ? "--" : String(projects.length).padStart(2, "0")}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-200/76">
              Every project from your CMS appears here automatically.
            </p>
          </div>
          <div className="rounded-lg border border-gold-300/22 bg-[linear-gradient(135deg,#0c1d33_0%,#183c62_55%,#f9b949_135%)] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-accent-300">
              Integration Ready
            </p>
            <p className="mt-4 font-display text-3xl leading-tight">
              Send your real project links next and I can slot them into this
              exact structure.
            </p>
          </div>
        </div>
      </section>
      </MotionReveal>

      <MotionReveal className="mt-14">
      <section>
        {loading ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="project-frame animate-pulse" aria-hidden="true">
                <div className="project-visual">
                  <div className="h-full w-full bg-white/6" />
                </div>
                <div className="project-content">
                  <div className="h-10 w-3/4 rounded-full bg-white/10" />
                  <div className="mt-6 h-4 w-full rounded-full bg-white/10" />
                  <div className="mt-3 h-4 w-11/12 rounded-full bg-white/10" />
                  <div className="mt-8 flex flex-wrap gap-3">
                    <div className="h-11 w-28 rounded-full bg-white/10" />
                    <div className="h-11 w-28 rounded-full bg-white/10" />
                    <div className="h-11 w-28 rounded-full bg-white/10" />
                  </div>
                  <div className="mt-10 h-16 w-full rounded-[22px] bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-card p-6 text-sm text-rose-200">
            {error || "No projects available right now."}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.article
                key={project._id}
                className="project-frame"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
              >
                <div className="project-visual">
                  <motion.img
                    variants={imageVariants}
                    initial="rest"
                    src={
                      index % 2 === 0
                        ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
                        : "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1600&q=80"
                    }
                    alt={project.title}
                  />
                  <div className="project-overlay" />
                </div>

                <motion.div
                  className="project-content"
                  variants={contentVariants}
                  initial="rest"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-[34px] font-semibold text-white sm:text-[40px]">
                      {project.title}
                    </h2>
                    <span
                      className={`mt-3 h-3 w-3 rounded-full ${
                        index % 2 === 0 ? "bg-[#21b2ff]" : "bg-[#ff3f80]"
                      }`}
                    />
                  </div>

                  <p className="mt-6 text-[18px] leading-10 text-slate-300/82 italic">
                    "{project.description}"
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {siteContent.expertise.slice(0, 4).map((tag) => (
                      <span key={`${project._id}-${tag}`} className="project-pill">
                        {tag.replace(".js", "").toUpperCase()}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col gap-4">
                    <a
                      href={project.url_1}
                      target="_blank"
                      rel="noreferrer"
                      className={index % 2 === 0 ? "project-button-main" : "project-button-gradient"}
                    >
                      Explore Project ↗
                    </a>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/projects/${project._id}`}
                        className="button-secondary"
                      >
                        Read More
                      </Link>
                      <button
                        type="button"
                        onClick={() => navigate("/contacts", { state: { project } })}
                        className="button-secondary"
                      >
                        Let&apos;s Build One
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
      </MotionReveal>
    </main>
  );
}
