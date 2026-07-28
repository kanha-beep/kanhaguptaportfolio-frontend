import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { siteContent } from "../content/siteContent";

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

const connectLinks = [
  { to: "/contacts", label: "Start a Project" },
  { to: "/projects", label: "View Projects" },
  { to: "/blogs", label: "Read Blogs" },
];

const socialItems = [
  { label: "GitHub", icon: "Git", href: siteContent.github },
  { label: "LinkedIn", icon: "Link", href: siteContent.linkedin },
];

export default function Footer() {
  return (
    <footer className="mt-28 pb-5">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-12 border-t border-white/8 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <h2 className="font-display text-[56px] font-extrabold leading-[0.92] text-white sm:text-[72px] lg:text-[86px]">
                LET&apos;S BUILD
                <span className="block bg-[linear-gradient(90deg,#31b8ff_0%,#59d7ff_34%,#7998ff_72%,#b55cff_100%)] bg-clip-text text-transparent">
                  SOMETHING GREAT
                </span>
              </h2>
              <p className="mt-10 max-w-3xl text-[22px] leading-[1.6] text-slate-300/82 italic">
                Open for thoughtful product work.
              </p>
            </div>

            <div className="flex items-start justify-start gap-4 lg:justify-end">
              <Link to="/contacts" className="inline-flex items-center justify-center rounded-[22px] bg-white px-8 py-5 text-[18px] font-semibold text-surface-950 transition hover:bg-slate-100">
                Start a Conversation
              </Link>
            
            </div>
          </div>
        </motion.div>

        <div className="mt-20 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="max-w-full whitespace-nowrap bg-[linear-gradient(90deg,#31b8ff_0%,#59d7ff_34%,#7998ff_72%,#b55cff_100%)] bg-clip-text font-display text-[2rem] leading-none font-bold uppercase text-transparent sm:text-[32px] lg:text-[2rem]">
                {siteContent.firstName}.{siteContent.lastName}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {socialItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-white/10 bg-white/4 text-xl text-slate-100 transition hover:border-gray-300 hover:bg-white/8"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-300/55">Navigation</p>
                <div className="mt-8 flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <Link key={link.label} to={link.to} className="text-[18px] text-slate-200/82 transition hover:text-white">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-300/55">Expertise</p>
                <div className="mt-8 flex flex-col gap-5">
                  {expertiseLinks.map((item) => (
                    <p key={item} className="text-[18px] text-slate-200/82 transition hover:text-white">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-300/55">Connect</p>
                <div className="mt-8 flex flex-col gap-6 text-[18px] text-slate-200/82">
                  {connectLinks.map((item) => (
                    <Link key={item.label} to={item.to} className="text-[18px] text-slate-200/82 transition hover:text-white">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
