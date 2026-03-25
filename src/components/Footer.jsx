import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-ink-950/10">
      <div className="layout py-10">
        <div className="panel grid gap-8 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-semibold text-ink-950">
              Portfolio OS
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-800/80">
              A sharper front door for case studies, writing, and new client
              conversations.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink-800">
              Explore
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-ink-950">
              <Link to="/">Home</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/blogs">Blogs</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink-800">
              Connect
            </p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-ink-950">
              <Link to="/contacts">Contact</Link>
              <Link to="/about">About</Link>
              <Link to="/cms">CMS</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink-800">
              Built With
            </p>
            <p className="mt-3 text-sm leading-7 text-ink-800/80">
              React, Vite, Tailwind CSS, and your existing blog/project CMS.
            </p>
          </div>
        </div>
        <p className="mt-5 text-center text-xs uppercase tracking-[0.26em] text-ink-800/70">
          © {new Date().getFullYear()} Portfolio OS
        </p>
      </div>
    </footer>
  );
}
