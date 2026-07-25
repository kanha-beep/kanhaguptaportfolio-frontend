import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { siteContent } from "../content/siteContent";

export default function About() {
  return (
    <main className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-300">About Me</span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            The same premium structure, now tuned for your story.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-200/80 sm:text-base">{siteContent.about}</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200/80 sm:text-base">{siteContent.journey}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="inline-flex items-center justify-center rounded-md bg-accent-500 px-5 py-3 text-sm font-semibold text-surface-950 transition hover:bg-accent-400">
              Explore Projects
            </Link>
            <Link to="/contacts" className="inline-flex items-center justify-center rounded-md border border-white/16 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent-400/40 hover:bg-white/10">
              Contact Me
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-white/10">
          <img
            src={siteContent.aboutImage}
            alt="Workspace setup"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </div>
        </section>
      </motion.div>

      <motion.div
        className="mt-20"
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="grid gap-5 lg:grid-cols-3">
          {siteContent.skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <article className="rounded-lg border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)]">
            <p className="text-xs uppercase tracking-[0.28em] text-accent-300">
              Skill Group
            </p>
            <h2 className="mt-4 font-display text-2xl text-white">
              {group.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-200/76">
              {group.description}
            </p>
            <div className="mt-5 space-y-2">
              {group.skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-md border border-white/10 bg-white/6 px-3 py-3 text-sm text-slate-100"
                >
                  {skill}
                </div>
              ))}
            </div>
              </article>
            </motion.div>
          ))}
        </section>
      </motion.div>

      <motion.div
        className="mt-20"
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="grid gap-5 lg:grid-cols-3">
          {siteContent.timeline.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <article className="rounded-lg border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)]">
            <p className="text-xs uppercase tracking-[0.28em] text-accent-300">
              {item.period}
            </p>
            <h2 className="mt-4 font-display text-2xl text-white">
              {item.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-200/76">
              {item.copy}
            </p>
              </article>
            </motion.div>
          ))}
        </section>
      </motion.div>
    </main>
  );
}
