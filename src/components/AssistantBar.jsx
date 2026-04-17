import { Link } from "react-router-dom";
import { siteContent } from "../content/siteContent";

const dockLinks = [
  { to: "/", label: "Home", icon: "⌂", active: true },
  { to: "/projects", label: "Projects", icon: "🚀" },
  { to: "/blogs", label: "Blogs", icon: "📄" },
  { to: "https://github.com", label: "GitHub", icon: "⌘", external: true },
  { to: "https://linkedin.com", label: "LinkedIn", icon: "in", external: true },
];

export default function AssistantBar() {
  return (
    <div className="assistant-strip">
      <div className="layout py-4">
        <div className="assistant-message">
          Hi! 👋 I&apos;m {siteContent.firstName}&apos;s portfolio assistant. I can
          help you learn about experience, projects, skills, and background.
          What would you like to know?
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="assistant-dock">
            <div className="assistant-dock-label">Blogs</div>
            {dockLinks.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.to}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className={`assistant-dock-button ${item.active ? "assistant-dock-button-active" : ""}`}
                >
                  {item.icon}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  aria-label={item.label}
                  className={`assistant-dock-button ${item.active ? "assistant-dock-button-active" : ""}`}
                >
                  {item.icon}
                </Link>
              ),
            )}
          </div>

          <button type="button" className="assistant-chat-button" aria-label="Assistant">
            ✦
          </button>
        </div>
      </div>
    </div>
  );
}
