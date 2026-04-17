import { Link } from "react-router-dom";
import { siteContent } from "../content/siteContent";
import MotionReveal from "../components/MotionReveal.jsx";

export default function About() {
  return (
    <main className="layout section-space">
      <MotionReveal>
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <span className="eyebrow">About Me</span>
          <h1 className="section-title mt-5">
            The same premium structure, now tuned for your story.
          </h1>
          <p className="section-copy mt-5">{siteContent.about}</p>
          <p className="section-copy mt-4">{siteContent.journey}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="button-primary">
              Explore Projects
            </Link>
            <Link to="/contacts" className="button-secondary">
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
      </MotionReveal>

      <MotionReveal className="mt-20">
      <section className="grid gap-5 lg:grid-cols-3">
        {siteContent.skillGroups.map((group) => (
          <article key={group.title} className="glass-card p-6">
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
        ))}
      </section>
      </MotionReveal>

      <MotionReveal className="mt-20">
      <section className="grid gap-5 lg:grid-cols-3">
        {siteContent.timeline.map((item) => (
          <article key={item.title} className="glass-card p-6">
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
        ))}
      </section>
      </MotionReveal>
    </main>
  );
}
