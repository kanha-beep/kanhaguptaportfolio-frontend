import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import MotionReveal from "../components/MotionReveal.jsx";
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
      <main className="layout section-space">
        <p className="text-center text-slate-200">Loading project...</p>
      </main>
    );
  }

  return (
    <main className="layout section-space">
      <MotionReveal amount={0.12}>
        <section className="mx-auto max-w-4xl">
          <div className="glass-card px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow">CMS Project</p>
                <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
                  Edit Project
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200/82">
                  Update the project content, links, and description without
                  changing the portfolio layout.
                </p>
              </div>
              <Link to="/cms/projects" className="button-secondary">
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
                  className="input-surface"
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
                  className="input-surface min-h-40 resize-none"
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
                  className="input-surface"
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
                  className="input-surface"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <UpdateProjectButton />
                <button
                  type="button"
                  onClick={() => navigate(`/projects/${projectsId}`)}
                  className="button-secondary"
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
      </MotionReveal>
    </main>
  );
}
