import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { siteContent } from "../content/siteContent";

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
    <main className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="grid gap-8 grid-cols-12 lg:grid-cols-12 my-auto  text-center">
          <div className="mt-10 flex col-span-9  md:col-span-6 md:mt-10 lg:mt-0 lg:col-span-5  sm:mt-10 rounded-lg border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)]">
            <p className="text-lg uppercase tracking-[0.28em] text-accent-300 flex justify-center items-center">
              Total Projects :
            </p>
            <p className="font-display text-4xl text-white">
              {loading ? "--" : String(projects.length).padStart(2, "0")}
            </p>
            
          </div>
        </section>
      </motion.div>

      <motion.div
        className="mt-7"
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <section>
        {loading ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="skeleton-card overflow-hidden rounded-[36px] border border-white/10 bg-[#0f1728] shadow-[0_30px_90px_rgba(0,0,0,0.35)]" aria-hidden="true">
                <div className="relative h-[300px] overflow-hidden border-b border-white/8 bg-[#0a1020] sm:h-[360px]">
                  <div className="h-full w-full bg-white/6" />
                </div>
                <div className="bg-[linear-gradient(180deg,#0f1728_0%,#10162c_100%)] p-8 sm:p-10">
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
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-sm text-rose-200 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)]">
            {error || "No projects available right now."}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.article
                key={project._id}
                className="overflow-hidden rounded-[36px] border border-white/10 bg-[#0f1728] shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                whileHover="hover"
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
              >
                <div className="relative h-[300px] overflow-hidden border-b border-white/8 bg-[#0a1020] sm:h-[360px]">
                  <motion.img
                    className="h-full w-full object-cover object-top"
                    initial={{ scale: 1 }}
                    whileHover={{
                      scale: 1.045,
                      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                    }}
                    src={
                      index % 2 === 0
                        ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
                        : "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1600&q=80"
                    }
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,22,0.05)_0%,rgba(8,12,22,0.34)_100%)]" />
                </div>

                <motion.div
                  className="bg-[linear-gradient(180deg,#0f1728_0%,#10162c_100%)] p-8 sm:p-10"
                  initial={{ y: 0 }}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-[34px] font-semibold text-white sm:text-[40px]">
                      {project.title}
                    </h2>
                    <span
                      className="mt-3 h-3 w-3 rounded-full bg-[#21b2ff]"
                      
                    />
                  </div>

                  <p className="mt-6 text-[18px] leading-10 text-slate-300/82 italic">
                    "{project.description}"
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {siteContent.expertise.slice(0, 4).map((tag) => (
                      <span key={`${project._id}-${tag}`} className="rounded-full border border-white/8 bg-white/6 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate-100">
                        {tag.replace(".js", "").toUpperCase()}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 flex gap-4">
                    <a
                      href={project.url_1}
                      target="_blank"
                      rel="noreferrer"
                      className={index % 2 === 0 ? "inline-flex items-center rounded-[22px] bg-white px-6 py-5 text-[18px] font-semibold text-surface-950 transition hover:bg-slate-100" : "inline-flex w-full items-center justify-center rounded-[22px] bg-[linear-gradient(90deg,#2764ff_0%,#21c1e8_100%)] px-6 py-5 text-[18px] font-semibold text-white transition hover:opacity-95"}
                    >
                      Explore Project ↗
                    </a>
                    {/* <div className="flex flex-wrap gap-3 justify-between"> */}
                      <Link
                        to={`/projects/${project._id}`}
                        className="inline-flex items-center justify-center rounded-md border border-white/16 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent-400/40 hover:bg-white/10"
                      >
                        Read More
                      </Link>
                      <button
                        type="button"
                        onClick={() => navigate("/contacts", { state: { project } })}
                        className="inline-flex items-center justify-center rounded-md border border-white/16 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent-400/40 hover:bg-white/10"
                      >
                        Let&apos;s Build One
                      </button>
                    {/* </div> */}
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        )}
        </section>
      </motion.div>
    </main>
  );
}
