import { Link } from "react-router-dom";
import { siteContent } from "../content/siteContent";

const dockLinks = [
  { to: "/", label: "Home", icon: "âŒ‚", active: true },
  { to: "/projects", label: "Projects", icon: "ðŸš€" },
  { to: "/blogs", label: "Blogs", icon: "ðŸ“„" },
  { to: "https://github.com", label: "GitHub", icon: "âŒ˜", external: true },
  { to: "https://linkedin.com", label: "LinkedIn", icon: "in", external: true },
];

export default function AssistantBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/8 bg-[linear-gradient(180deg,rgba(7,17,31,0.25)_0%,rgba(7,17,31,0.96)_38%,rgba(7,17,31,1)_100%)] backdrop-blur-xl">
      <div className="relative mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* <div className="assistant-message">
          Hi! ðŸ‘‹ I&apos;m {siteContent.firstName}&apos;s portfolio assistant. I can
          help you learn about experience, projects, skills, and background.
          What would you like to know?
        </div> */}

        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="relative flex items-center gap-4 rounded-full border border-[#27406f] bg-[#0b1430]/92 px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.42)]">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-[10px] border border-[#1848a0] bg-[#091739] px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#58a3ff]">
              Blogs
            </div>
            {dockLinks.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.to}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className={`relative flex h-16 w-16 items-center justify-center rounded-full border border-white/8 bg-white/6 text-[24px] text-slate-200 transition hover:bg-white/10 ${item.active ? "border-[#287dff] bg-[#102a5f] text-[#5ab0ff] shadow-[inset_0_0_0_1px_rgba(63,155,255,0.45)]" : ""}`}
                >
                  {item.icon}
                  {item.active ? (
                    <span className="absolute bottom-[-10px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#3e9cff]" />
                  ) : null}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  aria-label={item.label}
                  className={`relative flex h-16 w-16 items-center justify-center rounded-full border border-white/8 bg-white/6 text-[24px] text-slate-200 transition hover:bg-white/10 ${item.active ? "border-[#287dff] bg-[#102a5f] text-[#5ab0ff] shadow-[inset_0_0_0_1px_rgba(63,155,255,0.45)]" : ""}`}
                >
                  {item.icon}
                  {item.active ? (
                    <span className="absolute bottom-[-10px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#3e9cff]" />
                  ) : null}
                </Link>
              ),
            )}
          </div>

          <button
            type="button"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-2xl text-white shadow-[0_16px_40px_rgba(0,0,0,0.42)]"
            aria-label="Assistant"
          >
            âœ¦
          </button>
        </div>
      </div>
    </div>
  );
}
