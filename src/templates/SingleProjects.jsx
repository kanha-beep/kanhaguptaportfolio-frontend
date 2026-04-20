import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api.js";
import EditProjectButton from "../components/buttons/EditProjectButton.jsx";
import MotionReveal from "../components/MotionReveal.jsx";

export default function SingleProjects() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { projectsId } = useParams();
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const getSingleProjects = async () => {
      try {
        const res = await api.get(`/projects/${projectsId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching project:", err.response?.data?.message);
      }
    };
    getSingleProjects();
  }, [projectsId, token]);

  if (!projects) {
    return <p className="mt-10 text-center text-slate-200">Loading project...</p>;
  }

  return (
    <main className="layout section-space">
      <MotionReveal amount={0.12}>
      <article className="mx-auto max-w-4xl rounded-lg border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-300">
          Project Detail
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">
          {projects.title}
        </h1>
        <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-200/56">
          Posted on: {new Date(projects.createdAt).toLocaleDateString()}
        </p>
        <p className="mt-8 text-base leading-8 text-slate-200/78">
          {projects.description}
        </p>
        {projects.url_1 ? (
          <a
            href={projects.url_1}
            target="_blank"
            rel="noreferrer"
            className="button-primary mt-8"
          >
            Visit Live Project
          </a>
        ) : null}
        <div className="mt-6">
          <EditProjectButton navigate={navigate} projectsId={projectsId} />
        </div>
      </article>
      </MotionReveal>
    </main>
  );
}
