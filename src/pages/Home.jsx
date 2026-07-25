import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { siteContent } from "../content/siteContent";

const heroStackIcons = {
  "MongoDB": "fa-solid fa-database",
  Express: "fa-solid fa-server",
  "React.js": "fa-brands fa-react",
  "Node.js": "fa-brands fa-node-js",
};

const heroDockItems = [
  { label: "Home", iconClass: "fa-solid fa-house", to: "/" },
  { label: "Projects", iconClass: "fa-solid fa-diagram-project", to: "/projects" },
  { label: "Blog", iconClass: "fa-solid fa-blog", to: "/blogs" },
  { label: "GitHub", iconClass: "fa-brands fa-github", href: siteContent.github },
  { label: "LinkedIn", iconClass: "fa-brands fa-linkedin-in", href: siteContent.linkedin },
];

export default function Home({ profileImage }) {
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageData = async () => {
      const [projectsResult, blogsResult] = await Promise.allSettled([
        api.get("/projects"),
        api.get("/blogs"),
      ]);

      if (projectsResult.status === "fulfilled") {
        setProjects(projectsResult.value.data ?? []);
      } else {
        console.error(
          "Failed to load homepage projects:",
          projectsResult.reason,
        );
      }

      if (blogsResult.status === "fulfilled") {
        setPosts(blogsResult.value.data ?? []);
      } else {
        console.error("Failed to load homepage blogs:", blogsResult.reason);
      }

      setLoading(false);
    };

    fetchHomepageData();
  }, []);

  const featuredProjects = projects.slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  return (
    <main className="relative w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        animate={{
          y: [0, -10, 1],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease:"easeInOut"
          },
        }}
      >
        {/* hero section */}
        <section className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          {/* left main */}
          <div className="space-y-5 pt-2 ml-5 lg:pt-5">
            <span className="inline-flex items-center gap-3 rounded-full border border-[#1848a0] bg-[#091739] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#4898ff] shadow-[0_0_0_1px_rgba(43,116,255,0.08)]">
              <span className="h-[10px] w-[10px] rounded-full bg-[#2f8cff] shadow-[0_0_0_4px_rgba(47,140,255,0.16)]" />
              {siteContent.availability} {siteContent.heroLocation}
            </span>
            <div>
              <h1 className="mt-7 font-display text-[72px] leading-[0.9] font-extrabold tracking-tight text-white sm:text-[92px] lg:text-[118px]">
                {siteContent.firstName}
              </h1>
              <h1 className="mt-2 bg-[linear-gradient(90deg,#31b8ff_0%,#59d7ff_34%,#7998ff_72%,#b55cff_100%)] bg-clip-text font-display text-[72px] leading-[0.9] font-extrabold tracking-tight text-transparent sm:text-[92px] lg:text-[118px]">
                {siteContent.lastName}
              </h1>
              <div className="mt-10 flex items-center gap-3 text-[30px] text-slate-100 sm:text-[38px]">
                <span className="text-[#2f8cff]">&lt;/&gt;</span>
                <p className="text-[26px] font-light tracking-tight text-slate-300 sm:text-[38px]">
                  AI ML MERN Developer
                </p>
              </div>
              <div className="mt-8 max-w-2xl border-l border-[#2355a6] pl-8">
                <p className="text-[22px] leading-[1.7] text-slate-300/92 italic">
                  "{siteContent.heroCopy}"
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-transparent px-8 py-5 text-base font-semibold text-white transition hover:bg-white/6"
                >
                  Explore Projects
                </Link>
              </div>
              <div className="mt-20 flex flex-wrap gap-x-8 gap-y-4">
                {siteContent.heroStack.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-3 text-[15px] font-semibold text-white"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2d4f91] bg-[#0f1b3d] text-sm text-[#46a1ff]">
                      <i
                        className={heroStackIcons[item] ?? "fa-solid fa-code"}
                        aria-hidden="true"
                      />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* right main */}
          <div className="relative pt-4 lg:pt-0">
            <div className="relative min-h-[630px] overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_top,#20215a_0%,#11153c_36%,#090f27_100%)] p-0 shadow-[0_24px_80px_rgba(0,0,0,0.32)] after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(7,17,31,0.06)_0%,rgba(7,17,31,0.8)_100%)] after:content-['']">
              <img
                src={profileImage || siteContent.profileImage}
                alt={siteContent.profileImage}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="static left-[-3%] bottom-3 z-20 flex items-center gap-3 rounded-full border border-[#27406f] bg-[#0b1430]/92 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:absolute">
                {heroDockItems.map((item, index) =>
                  item.to ? (
                    <Link
                      key={item.label}
                      to={item.to}
                      aria-label={item.label}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/8 bg-white/6 text-lg text-slate-200 ${index === 0 ? "border-[#287dff] bg-[#102a5f] text-[#5ab0ff] shadow-[inset_0_0_0_1px_rgba(63,155,255,0.45)]" : ""}`}
                    >
                      {item.iconClass ? <i className={item.iconClass} aria-hidden="true" /> : item.icon}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/8 bg-white/6 text-lg text-slate-200"
                    >
                      {item.iconClass ? <i className={item.iconClass} aria-hidden="true" /> : item.icon}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      <motion.div
        className="mt-15"
        initial={{ opacity: 0}}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Professional Experience second section */}
        <section>
          <div className="text-center">
            {/* <span className="inline-flex items-center gap-2 rounded-full border border-[#1848a0] bg-[#091739] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#4898ff]">
              Work History
            </span> */}
            <h2 className="mt-8 font-display text-[58px] font-extrabold leading-[0.92] text-white sm:text-[74px] lg:text-[94px]">
              Professional
              <span className="block bg-[linear-gradient(90deg,#31b8ff_0%,#59d7ff_34%,#7998ff_72%,#b55cff_100%)] bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
          </div>
          {/* main div below profesisonal expericne which contains all text */}
          <div className="relative mt-20">
            <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(56,118,255,0.4),rgba(137,88,255,0.4))] lg:block" />
            <div className="grid gap-12">
              {/* 2 separate div for 2 experiences horizontal */}
              {siteContent.experiences.map((experience, index) => (
                <div
                  key={`${experience.company}-${experience.role}`}
                  className="grid items-start gap-6 lg:grid-cols-[1fr_80px_1fr]"
                >
                  {index % 2 === 0 ? (
                    <>
                      <div />
                      <div className="relative hidden lg:block">
                        <div className="absolute top-1/2 left-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4f7fb] shadow-[0_0_0_6px_rgba(19,32,61,0.9)]" />
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.18 }}
                        transition={{
                          duration: 0.55,
                          delay: index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {/* actual full box of single experience vertical */}
                        <article
                          className={`relative rounded-[32px] border bg-[#111827] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.34)] sm:p-10 ${
                            experience.accent === "violet"
                              ? "border-[rgba(172,84,255,0.22)]"
                              : "border-[rgba(0,150,255,0.22)]"
                          }`}
                        >
                          {/* top header */}
                          <div className="flex items-start gap-5">
                            <div className="flex h-18 w-[2rem] items-center  mt-2 justify-center rounded-3xl border border-white/8 bg-white/6 text-xl font-semibold text-slate-200">
                              {experience.company.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="">
                              <h3 className="font-display text-[28px] font-semibold text-white">
                                {experience.role}
                              </h3>
                              <p className="mt-1 text-[15px] font-semibold uppercase tracking-[0.08em] text-[#3e8fff]">
                                {experience.company}
                              </p>
                            </div>
                          </div>

                          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-slate-300/72">
                            <span>{experience.period}</span>
                            <span>{experience.location}</span>
                          </div>

                          <div className="mt-8 border-t border-white/8 pt-8">
                            <div className="space-y-5">
                              {experience.points.map((point) => (
                                <div
                                  key={point}
                                  className="flex gap-4 text-[16px] leading-9 text-slate-300/88"
                                >
                                  <span className="text-[#3f8fff]">&gt;</span>
                                  <p>{point}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </article>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0, x: -200 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.18 }}
                        transition={{
                          duration: 0.55,
                          delay: index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {/* // 2nd single experience vertical */}

                        <article
                          className={`relative rounded-[32px] border bg-[#111827] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.34)] sm:p-10 ${
                            experience.accent === "violet"
                              ? "border-[rgba(172,84,255,0.22)]"
                              : "border-[rgba(0,150,255,0.22)]"
                          }`}
                        >
                          <div className="flex items-start gap-5">
                            <div className="flex mt-2 h-18 w-[2rem] items-center justify-center rounded-3xl border border-white/8 bg-white/6 text-xl font-semibold text-slate-200">
                              {experience.company.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-display text-[28px] font-semibold text-white">
                                {experience.role}
                              </h3>
                              <p className="mt-1 text-[15px] font-semibold uppercase tracking-[0.08em] text-[#3e8fff]">
                                {experience.company}
                              </p>
                            </div>
                          </div>

                          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-slate-300/72">
                            <span>{experience.period}</span>
                            <span>{experience.location}</span>
                          </div>

                          <div className="mt-8 border-t border-white/8 pt-8">
                            <div className="space-y-5">
                              {experience.points.map((point) => (
                                <div
                                  key={point}
                                  className="flex gap-4 text-[16px] leading-9 text-slate-300/88"
                                >
                                  <span className="text-[#3f8fff]">&gt;</span>
                                  <p>{point}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </article>
                      </motion.div>
                      <div className="relative hidden lg:block">
                        <div className="absolute top-1/2 left-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4f7fb] shadow-[0_0_0_6px_rgba(19,32,61,0.9)]" />
                      </div>
                      <div />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>

      <motion.div
        className="mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <section id="education">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="mt-4 font-display text-[58px] font-extrabold leading-[0.92] text-white sm:text-[74px] lg:text-[94px]">
              Education
              <span className="block bg-[linear-gradient(90deg,#31b8ff_0%,#59d7ff_34%,#7998ff_72%,#b55cff_100%)] bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {siteContent.educationCards.map((item, index) => (
              <motion.div
                key={`${item.title}-${item.institution}`}
                className="h-full"
                initial={{ opacity: 0, x: 200 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.18 }}
                transition={{
                  duration: 0.3,
                  delay: index < 2 ? 0.5 : 0.8,
                  ease: "easeOut",
                }}
              >
                <article className="relative flex h-full min-h-[20rem] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#131c2d] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.3)] sm:p-10">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex items-start gap-5">
                      <div className="flex h-18 w-18 items-center justify-center rounded-[22px] bg-white text-3xl text-slate-700">
                        <i
                          className={item.iconClass ?? "fa-solid fa-certificate"}
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <h3 className="font-display text-[24px] font-semibold text-white sm:text-[30px] break-words">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[15px] text-slate-300/62">
                          {item.year}
                        </p>
                      </div>
                    </div>
                    <span
                      className={
                        item.accent === "gold"
                          ? "rounded-full border border-[#7a5f1b] bg-[#2f250d] px-4 py-2 text-sm font-semibold text-[#ffca4d]"
                          : item.accent === "violet"
                            ? "rounded-full border border-[#6935a8] bg-[#28143e] px-4 py-2 text-sm font-semibold text-[#c58cff]"
                            : "rounded-full border border-[#234e98] bg-[#10244f] px-4 py-2 text-sm font-semibold text-[#5ea7ff]"
                      }
                    >
                      {item.badge}
                    </span>
                  </div>

                  <div className="mt-8">
                    <p className="text-[17px] font-semibold text-slate-100 decoration-white/15 underline-offset-4">
                      {item.institution}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-white/8 pt-8">
                    <p className="text-[18px] leading-9 text-slate-300/78 italic">
                      "{item.note}"
                    </p>
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>

      <motion.div
        className="mt-15 h-full"
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <section>
          <div>
            {/* <span className="inline-flex items-center gap-2 rounded-full border border-[#1848a0] bg-[#091739] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#4898ff]">
              Portfolio
            </span> */}
            <h2 className="mt-8 font-display text-[58px] font-extrabold leading-[0.92] text-white sm:text-[74px] lg:text-[94px] py-5 text-center">
              Featured
              <span className="h-[7rem] block bg-[linear-gradient(90deg,#31b8ff_0%,#59d7ff_34%,#7998ff_72%,#b55cff_100%)] bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, x: 200 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <article className="overflow-hidden rounded-[36px] border border-white/10 bg-[#0f1728] shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
                    <div className="relative h-[300px] overflow-hidden border-b border-white/8 bg-[#0a1020] sm:h-[360px]">
                      <img
                        src={
                          index === 0
                            ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
                            : "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1600&q=80"
                        }
                        alt={project.title}
                        className="h-full w-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,22,0.05)_0%,rgba(8,12,22,0.34)_100%)]" />
                    </div>

                    <div className="bg-[linear-gradient(180deg,#0f1728_0%,#10162c_100%)] p-8 sm:p-10">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-[34px] font-semibold text-white sm:text-[40px]">
                          {project.title}
                        </h3>
                        <span
                          className={`mt-3 h-3 w-3 rounded-full ${
                            index === 0 ? "bg-[#21b2ff]" : "bg-[#ff3f80]"
                          }`}
                        />
                      </div>

                      <p className="mt-6 text-[18px] leading-10 text-slate-300/82 italic">
                        "{project.description}"
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        {siteContent.expertise.slice(0, 4).map((tag) => (
                          <span
                            key={`${project._id}-${tag}`}
                            className="rounded-full border border-white/8 bg-white/6 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate-100"
                          >
                            {tag.replace(".js", "").toUpperCase()}
                          </span>
                        ))}
                      </div>

                      <div className="mt-10">
                        <a
                          href={project.url_1}
                          target="_blank"
                          rel="noreferrer"
                          className={
                            index === 0
                              ? "inline-flex w-full items-center justify-center rounded-[22px] bg-white px-6 py-5 text-[18px] font-semibold text-surface-950 transition hover:bg-slate-100"
                              : "inline-flex w-full items-center justify-center rounded-[22px] bg-[linear-gradient(90deg,#2764ff_0%,#21c1e8_100%)] px-6 py-5 text-[18px] font-semibold text-white transition hover:opacity-95"
                          }
                        >
                          OPen
                        </a>
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))
            ) : (
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-200/76 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)] lg:col-span-2">
                Your backend is already connected. Once your project entries or
                links are added, this area becomes the featured showcase.
              </div>
            )}
          </div>
        </section>
      </motion.div>

      {/* <motion.div
        className="mt-15"
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div className="overflow-hidden rounded-lg border border-white/10">
            <img
              src={siteContent.aboutImage}
              alt="Developer workspace"
              className="h-full min-h-[380px] w-full object-cover"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-300">
              Latest Blogs
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Writing slots into the same premium structure too.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200/80 sm:text-base">
              Your blog posts keep the same dark theme, spacing, and hierarchy
              so the whole portfolio feels like one system rather than
              disconnected pages.
            </p>
            <div className="mt-8 grid gap-4">
              {latestPosts.length > 0 ? (
                latestPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to={`/blogs/${post._id}`}
                      className="block rounded-lg border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs uppercase tracking-[0.28em] text-accent-300">
                          New Post
                        </span>
                        <span className="text-xs uppercase tracking-[0.22em] text-slate-200/56">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl text-white">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-200/76">
                        {post.summary}
                      </p>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-200/76 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)]">
                  Blog entries from your CMS will appear here automatically.
                </div>
              )}
            </div>
          </div>
        </section>
      </motion.div> */}
    </main>
  );
}

