import { Link } from "react-router-dom";
import { siteContent } from "../content/siteContent";
import MotionReveal from "./MotionReveal.jsx";
import MotionCard from "./MotionCard.jsx";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "Experience" },
  { to: "/about", label: "Education" },
];

const expertiseLinks = [
  "Full Stack MERN Dev",
  "React.js Specialist",
  "Next.js Architecture",
  "REST API Design",
];

const socialItems = [
  { label: "GitHub", icon: "⌘" },
  { label: "LinkedIn", icon: "in" },
  { label: "Twitter", icon: "X" },
];

export default function Footer() {
  return (
    <footer className="mt-28 pb-12">
      <div className="layout">
        <MotionReveal>
        <div className="grid gap-12 border-t border-white/8 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <h2 className="font-display text-[56px] font-extrabold leading-[0.92] text-white sm:text-[72px] lg:text-[86px]">
              LET&apos;S BUILD
              <span className="hero-gradient-text block">SOMETHING GREAT</span>
            </h2>
            <p className="mt-10 max-w-3xl text-[22px] leading-[1.6] text-slate-300/82 italic">
              Currently available for freelance opportunities and full-time
              roles in{" "}
              <span className="font-semibold text-white">
                Bhopal, Madhya Pradesh, and Remote.
              </span>
            </p>
          </div>

          <div className="flex items-start justify-start gap-4 lg:justify-end">
            <Link to="/contacts" className="footer-cta-button">
              Start a Conversation ✉
            </Link>
            <a
              href="#top"
              className="flex h-[78px] w-[78px] items-center justify-center rounded-[22px] border border-white/10 bg-white/4 text-3xl text-white transition hover:bg-white/8"
            >
              ^
            </a>
          </div>
        </div>
        </MotionReveal>

        <div className="mt-20 grid gap-12 lg:grid-cols-4">
          <MotionCard index={0}>
          <div>
            <p className="hero-gradient-text font-display text-[40px] font-extrabold uppercase">
              {siteContent.firstName}.{siteContent.lastName}
            </p>
            <div className="mt-8 flex gap-4">
              {socialItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  aria-label={item.label}
                  className="footer-icon-button"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          </MotionCard>

          <MotionCard index={1}>
          <div>
            <p className="footer-label">Navigation</p>
            <div className="mt-8 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.to} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          </MotionCard>

          <MotionCard index={2}>
          <div>
            <p className="footer-label">Expertise</p>
            <div className="mt-8 flex flex-col gap-5">
              {expertiseLinks.map((item) => (
                <p key={item} className="footer-link">
                  {item}
                </p>
              ))}
            </div>
          </div>
          </MotionCard>

          <MotionCard index={3}>
          <div>
            <p className="footer-label">Connect</p>
            <div className="mt-8 flex flex-col gap-6 text-[18px] text-slate-200/82">
              <a href={`mailto:${siteContent.email}`} className="footer-link">
                ✉ {siteContent.email}
              </a>
              <a href={`tel:${siteContent.phone}`} className="footer-link">
                ☎ {siteContent.phone}
              </a>
              <p className="footer-link">📍 Ghaziabad / Noida, IN</p>
            </div>
          </div>
          </MotionCard>
        </div>
      </div>
    </footer>
  );
}
