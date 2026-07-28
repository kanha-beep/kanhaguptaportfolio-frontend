import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import { siteContent } from "../content/siteContent";

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
  const [errorMessage, setErrorMessage] = useState("");
  const latestContact = contactData[contactData.length - 1];

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
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
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong while sending your message. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setContactData([]);
  };

  return (
    <main className="relative mx-auto w-[90%] max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="grid gap-8 lg:grid-cols-2 md:grid-cols-2">
          

          <div className="rounded-lg border border-white/10 md:mt-10 lg:mt-0 mt-5 bg-white/5 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)] sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage ? (
                <div className="rounded-lg border border-rose-200/30 bg-rose-200/10 px-4 py-3 text-sm text-rose-200">
                  {errorMessage}
                </div>
              ) : null}

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-white"
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
                  className="text-black w-full rounded-md border border-white/10 bg-white/6 px-4 py-3 text-sm outline-none transition  focus:border-accent-400/50 focus:bg-white/8"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium "
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
                  className="w-full rounded-md borde text-black border-white/10 bg-white/6 px-4 py-3 text-sm  outline-none transition focus:border-accent-400/50 focus:bg-white/8"
                  required
                />
              </div>

              {!projectDetails ? (
                <div>
                  <label
                    htmlFor="projectName"
                    className="mb-2 block text-sm font-medium"
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
                    className="w-full rounded-md border text-black border-white/10 bg-white/6 px-4 py-3 text-sm outline-none transition focus:border-accent-400/50 focus:bg-white/8"
                  />
                </div>
              ) : null}

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about the goal, audience, timeline, or what you want improved."
                  value={form.message}
                  onChange={handleChange}
                  className="min-h-10 w-full resize-none rounded-md border border-white/10 bg-white/6 px-4 py-3 text-sm text-black outline-none transition focus:border-accent-400/50 focus:bg-white/8"
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-accent-500 px-5 py-3 text-sm font-semibold text-surface-950 transition hover:bg-accent-400"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          <div className="space-y-5">
          

            <div className="rounded-lg border border-white/10 bg-white/5 mt-10 md:col-span- lg:mt-0 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-300">
                Direct Details
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-200/76">
                <p>{siteContent.email}</p>
                <p>{siteContent.phone}</p>
                <p>{siteContent.location}</p>
              </div>
            </div>

            {projectDetails ? (
              <div className="rounded-lg border border-accent-400/22 bg-accent-400/10 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-300">
                  Selected Project
                </p>
                <p className="mt-3 font-display text-3xl text-white">
                  {projectDetails.title}
                </p>
               
              </div>
            ) : null}
          </div>
        </section>
      </motion.div>

      {latestContact ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/72 px-4 backdrop-blur-lg">
          <div className="w-full max-w-md rounded-2xl border border-accent-400/30 bg-[#0f1b2d] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-300">
              Message Received
            </p>
            <h2 className="mt-4 font-display text-3xl text-white">
              Thanks {latestContact.name}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-200/82">
              Your inquiry has been submitted . I&apos;ll get back to you soon.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-accent-500 px-5 py-3 text-sm font-semibold text-surface-950 transition hover:bg-accent-400"
                onClick={() => {
                  closeSuccessModal();
                  navigate("/projects");
                }}
              >
                Explore More Projects
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-white/16 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent-400/40 hover:bg-white/10"
                onClick={closeSuccessModal}
              >
                Stay Here
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
