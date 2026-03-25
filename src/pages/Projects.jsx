import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Projects({ error, setError }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res?.data ?? []);
      } catch (fetchError) {
        console.log(
          "error in get projects",
          fetchError?.response?.data?.message,
        );
        setError(fetchError?.response?.data?.message ?? "Unable to load work.");
      }
    };

    getAllProjects();
  }, [setError]);

  return (
    <main className="layout py-10 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="panel px-6 py-8 sm:px-8 sm:py-10">
          <span className="eyebrow">Case study library</span>
          <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight text-ink-950 sm:text-6xl">
            Projects presented like product narratives.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink-800/85 sm:text-lg">
            Instead of generic cards, this layout spotlights intent,
            description, and action. It is designed to help clients or hiring
            teams understand what you make and move toward a conversation.
          </p>
        </div>

        <div className="space-y-4">
          <div className="panel p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-ink-800/60">
              Catalogue size
            </p>
            <p className="mt-4 font-display text-5xl text-ink-950">
              {String(projects.length).padStart(2, "0")}
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-800/80">
              Every new entry from the CMS drops into this collection
              automatically.
            </p>
          </div>
          <div className="rounded-[28px] bg-[linear-gradient(140deg,#08111f_0%,#1d3557_50%,#ffcb7a_120%)] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-white/70">
              Conversion path
            </p>
            <p className="mt-4 font-display text-3xl leading-tight">
              Interested visitors can jump from a project card straight into the
              contact flow.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-14">
        {projects.length === 0 ? (
          <div className="panel p-6 text-sm text-rose-900">
            {error || "No projects available right now."}
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {projects.map((project, index) => (
              <article key={project._id} className="feature-card">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.3em] text-ink-800/55">
                    Project {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-ink-950/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-950">
                    Live build
                  </span>
                </div>
                <h2 className="mt-5 font-display text-3xl font-semibold text-ink-950">
                  {project.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-800/80 sm:text-base">
                  {project.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={project.url_1}
                    target="_blank"
                    rel="noreferrer"
                    className="button-primary"
                  >
                    Visit Project
                  </a>
                  <Link
                    to={`/projects/${project._id}`}
                    className="button-secondary"
                  >
                    Read More
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/contacts", { state: { project } })
                    }
                    className="button-secondary"
                  >
                    Start a Similar Project
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
