import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

const contactSteps = [
  "Share the project goal",
  "Add context or constraints",
  "Receive a follow-up with next steps",
];

export default function Contact() {
  const location = useLocation();
  const navigate = useNavigate();
  const projectDetails = location?.state?.project;
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    projectName: "",
    projectId: "",
  });
  const [contactData, setContactData] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const formData = {
        ...form,
        projectName: projectDetails?.title || form.projectName,
        projectId: projectDetails?._id || form.projectId,
      };
      const res = await api.post("/contacts", formData);
      setContactData((previous) => [...previous, res.data]);
      setForm({
        name: "",
        email: "",
        message: "",
        projectName: "",
        projectId: "",
      });
    } catch (error) {
      console.log("error: ", error.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="layout py-10 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
          <div className="panel px-6 py-8 sm:px-8">
            <span className="eyebrow">Contact studio</span>
            <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight text-ink-950 sm:text-6xl">
              Let&apos;s turn interest into a clear brief.
            </h1>
            <p className="mt-5 text-base leading-8 text-ink-800/85 sm:text-lg">
              The contact page is framed like an intake desk: direct, calm, and
              designed to move visitors from curiosity to a real conversation.
            </p>
          </div>

          <div className="panel p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-800/60">
              What happens next
            </p>
            <div className="mt-4 grid gap-4">
              {contactSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-3xl bg-white/80 px-4 py-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm text-ink-950">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {projectDetails ? (
            <div className="rounded-[28px] bg-mint-300/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-800/60">
                Selected project
              </p>
              <p className="mt-3 font-display text-3xl text-ink-950">
                {projectDetails.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-800/80">
                Your message will be linked to this project automatically.
              </p>
            </div>
          ) : null}
        </div>

        <div className="panel px-6 py-8 sm:px-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-ink-950"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="input-surface"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-ink-950"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="input-surface"
                required
              />
            </div>

            {!projectDetails ? (
              <div>
                <label
                  htmlFor="projectName"
                  className="mb-2 block text-sm font-medium text-ink-950"
                >
                  Project or inquiry title
                </label>
                <input
                  id="projectName"
                  type="text"
                  name="projectName"
                  placeholder="Website redesign, dashboard, blog setup..."
                  value={form.projectName}
                  onChange={handleChange}
                  className="input-surface"
                />
              </div>
            ) : null}

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-ink-950"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about the goal, audience, timeline, or what you want improved."
                value={form.message}
                onChange={handleChange}
                className="input-surface min-h-40 resize-none"
                required
              />
            </div>

            <button type="submit" className="button-primary" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {contactData.length > 0 ? (
            <section className="mt-8 rounded-[24px] border border-mint-400/40 bg-mint-300/25 p-5">
              {contactData.map((contact) => (
                <div key={contact._id}>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-800/60">
                    Message received
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink-950">
                    Thanks {contact.name}, your inquiry has been submitted using{" "}
                    <span className="font-semibold">{contact.email}</span>.
                  </p>
                </div>
              ))}
              <button
                type="button"
                className="button-secondary mt-5"
                onClick={() => navigate("/projects")}
              >
                Explore More Projects
              </button>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}
