import { useEffect, useState } from "react";
import api from "../api.js";
import { useNavigate } from "react-router-dom";
import ViewProjectButton from "../components/buttons/ViewProjectButton.jsx";
import DeleteProjectButton from "../components/buttons/DeleteProjectButton.jsx";
import AddProjectButton from "../components/buttons/AddProjectButton.jsx";

const emptyProject = {
  title: "",
  description: "",
  url_1: "",
  url_2: "",
};

export default function CMSProjects() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState(emptyProject);
  const handleChange = (e) => {
    setNewProject((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const res = await api.get("/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data ?? []);
      } catch (error) {
        console.log("error in get projects", error?.response?.data?.message);
      }
    };

    getAllProjects();
  }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description || !newProject.url_1) {
      return alert("Please enter details");
    }

    try {
      const res = await api.post("/projects", newProject, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((previous) => [...previous, res.data]);
      setNewProject(emptyProject);
    } catch (error) {
      console.log("error in add project", error?.response?.data?.message);
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Manage Projects</h1>

      <section style={{ margin: "2rem 0" }}>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={handleChange}
            className="form-control my-2"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={handleChange}
            className="form-control my-2"
            required
          />
          <input
            type="text"
            name="url_1"
            placeholder="Project Link 1"
            value={newProject.url_1}
            onChange={handleChange}
            className="form-control my-2"
            required
          />
          <input
            type="text"
            name="url_2"
            placeholder="Project Link 2 (Optional)"
            value={newProject.url_2}
            onChange={handleChange}
            className="form-control my-2"
          />
          <AddProjectButton />
        </form>
      </section>

      <section>
        {projects.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="d-flex">
              <DeleteProjectButton
                projects={projects}
                token={token}
                p={p}
                setProjects={setProjects}
              />
              <ViewProjectButton navigate={navigate} p={p} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
