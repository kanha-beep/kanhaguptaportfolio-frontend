import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import UpdateProjectButton from "../components/buttons/UpdateProjectButton.jsx";

const emptyProject = {
  title: "",
  description: "",
  url_1: "",
  url_2: "",
};

export default function EditPage() {
  const { projectsId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [project, setProject] = useState(emptyProject);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProject = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/projects/${projectsId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProject({
          title: res.data?.title ?? "",
          description: res.data?.description ?? "",
          url_1: res.data?.url_1 ?? "",
          url_2: res.data?.url_2 ?? "",
        });
        setError("");
      } catch (err) {
        console.error("Error fetching project:", err?.response?.data?.message);
        setError(err?.response?.data?.message ?? "Unable to load project.");
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, [projectsId, token]);

  const handleChange = (event) => {
    setProject((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.patch(`/projects/${projectsId}/edit`, project, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/cms/projects");
    } catch (err) {
      console.error("Error updating project:", err?.response?.data?.message);
      setError(err?.response?.data?.message ?? "Unable to update project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
        <p className="text-center text-slate-200">Loading project...</p>
      </main>
    );
  }

  return (
    <main className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-white/10 bg-white/5 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)] sm:px-8 sm:py-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-300">CMS Project</p>
                <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
                  Edit Project
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200/82">
                  Update the project content, links, and description without
                  changing the portfolio layout.
                </p>
              </div>
              <Link to="/cms/projects" className="inline-flex items-center justify-center rounded-md border border-white/16 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent-400/40 hover:bg-white/10">
                Back to CMS
              </Link>
            </div>

            {error ? (
              <div className="mt-6 rounded-lg border border-rose-200/30 bg-rose-200/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleUpdate} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Project Title
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={project.title}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-200/40 focus:border-accent-400/50 focus:bg-white/8"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={project.description}
                  onChange={handleChange}
                  className="min-h-40 w-full resize-none rounded-md border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-200/40 focus:border-accent-400/50 focus:bg-white/8"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="url_1"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Primary Project Link
                </label>
                <input
                  id="url_1"
                  type="url"
                  name="url_1"
                  value={project.url_1}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-200/40 focus:border-accent-400/50 focus:bg-white/8"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="url_2"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Secondary Link
                </label>
                <input
                  id="url_2"
                  type="url"
                  name="url_2"
                  value={project.url_2}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-200/40 focus:border-accent-400/50 focus:bg-white/8"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <UpdateProjectButton />
                <button
                  type="button"
                  onClick={() => navigate(`/projects/${projectsId}`)}
                  className="inline-flex items-center justify-center rounded-md border border-white/16 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent-400/40 hover:bg-white/10"
                >
                  Preview Project
                </button>
              </div>

              {saving ? (
                <p className="text-sm text-slate-300/76">Saving changes...</p>
              ) : null}
            </form>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
