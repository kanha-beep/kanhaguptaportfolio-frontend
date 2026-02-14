import { useEffect, useState } from "react";
import api from "../api"; // Axios instance with backend baseURL
import { Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Fetch projects from backend on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects"); // Backend endpoint
        setProjects(res.data);
        setLoading(false);
      } catch (err) {
        console.error(
          "Failed to fetch projects:",
          err?.response?.data?.message
        );
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading...
      </div>
    );
  console.log(projects);
  return (
    <main className="container py-4 text-center d-flex flex-column">
      <div className="flex-grow-1">

      
      <h1 className="mb-3">Welcome to My Portfolio</h1>
      <p>Showcasing my projects, skills, and achievements.</p>

      <section className="mt-5">
        <h2>Featured Projects</h2>
        <div className="row mt-3">
          {projects.length > 0 ? (
            projects.map((p) => (
              <div key={p._id} className="col-md-4 col-12 mb-3">
                <div className="card h-100">
                  <h3 className="card-header">{p?.title}</h3>
                  <div className="card-body">
                    <p className="card-text">{p?.description}</p>
                  </div>
                  <div className="card-footer">
                    <button
                      onClick={() => {
                        window.open(p?.url_1, "_blank", "noopener, noreferrer");
                      }}
                      className="btn btn-outline-success btn-sm"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </section>
      </div>
    </main>
  );
}
