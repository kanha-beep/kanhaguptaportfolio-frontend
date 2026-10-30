import { getEasingForSegment, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  EffectCards,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import api from "../api";
import { siteContent } from "../content/siteContent";
import ProjectCoverflow from "../components/ProjectCoverflow";
import SkillsSwiper from "../components/SkillsSwiper";
import ExperienceCoverflow from "../components/ExperienceCoverflow";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
const heroStackIcons = {
  MongoDB: "fa-solid fa-database",
  Express: "fa-solid fa-server",
  "React.js": "fa-brands fa-react",
  "Node.js": "fa-brands fa-node-js",
};

const heroDockItems = [
  { label: "Home", iconClass: "fa-solid fa-house", to: "/" },
  {
    label: "Projects",
    iconClass: "fa-solid fa-diagram-project",
    to: "/projects",
  },
  { label: "Blog", iconClass: "fa-solid fa-blog", to: "/blogs" },
  {
    label: "GitHub",
    iconClass: "fa-brands fa-github",
    href: siteContent.github,
  },
  {
    label: "LinkedIn",
    iconClass: "fa-brands fa-linkedin-in",
    href: siteContent.linkedin,
  },
];

export default function Home({ profileImage }) {
  const [projects, setProjects] = useState([]);
  const [educationCards, setEducationCards] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setProjectsLoading(true);
        setProjectsError("");
        const res = await api.get("/projects");
        setProjects(res?.data ?? []);
      } catch (error) {
        setProjects([]);
        setProjectsError(
          error?.response?.data?.message ?? "Unable to load featured projects.",
        );
        console.error("Failed to load homepage projects:", error);
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  useEffect(() => {
    api
      .get("/content/education")
      .then((res) => setEducationCards(res?.data ?? []))
      .catch((error) =>
        console.error("Failed to load education content:", error),
      );
  }, []);

  const featuredProjects = projects.slice(0, 3);
  gsap.registerPlugin(ScrollToPlugin);
  useEffect(() => {
    const counter = document.querySelector(".counter");
    const obj = { value: 0 };
    gsap.to(obj, {
      value: 100,
      duration: 2,
      onUpdate: () => {
        console.log(Math.round(obj.value));
        counter.innerText = `${Math.round(obj.value)}%`;
      },
      // value 10  ke baad kya hoga - counter fade ho jaaega
      onComplete: () => {
        gsap.to(counter, {
          opacity: 0,
          duration: 1,
          ease: "power3.in",
          onComplete: () => {
            boxDown.play();
            gsap.fromTo(
              ".myImage",
              {
                scale: 0.8,
              },
              { scale: 1, duration: 1 },
            );
            gsap.fromTo(
              ".leftDiv",
              {
                scale: 0.5,
              },
              { scale: 1, duration: 1 },
            );
          },
        });
      },
    });
    const boxDown = gsap.timeline({ paused: true });
    boxDown.to(".boxl", {
      y: 700,
      ease: "expo.out",
      duration: 1.5,
      delay: 0,
      opacity: 0,
    });
  }, []);

  return (
    <main className="relative w-full max-w-7xl p-4 sm:px-6 sm:pt-18 lg:px-8 lg:py-20">
      {/* <div className="absolute w-[20rem] h-[20rem] bg-yellow-400 boxr z-[10000]"></div> */}
      <div className="w-full flex items-center justify-center">
        <div className=" fixed bottom-1 z-20 flex items-center gap-3 rounded-full border border-[#27406f] px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          {heroDockItems.map((item, index) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                aria-label={item.label}
                className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/8 bg-white/6 text-lg text-slate-200 ${index === 0 ? "border-[#287dff] bg-[#102a5f] text-[#5ab0ff] shadow-[inset_0_0_0_1px_rgba(63,155,255,0.45)]" : ""}`}
              >
                {item.iconClass ? (
                  <i className={item.iconClass} aria-hidden="true" />
                ) : (
                  item.icon
                )}
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
                {item.iconClass ? (
                  <i className={item.iconClass} aria-hidden="true" />
                ) : (
                  item.icon
                )}
              </a>
            ),
          )}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        // animate={{
        //   y: [0, -10, 1],
        //   transition: {
        //     duration: 3,
        //     repeat: Infinity,
        //     ease: "easeInOut",
        //   },
        // }}
      >
        <section className="absolute h-[44rem] w-[100%] bg-black boxl z-[1000] flex justify-center items-center">
          <div className="font-bold text-white counter"></div>
        </section>
        {/* <svg className="h-[30vh] w-[100vw]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            pathLength={1}
            fill="none"
            stroke="tomato"
            strokeWidth={2}
            d="M 10 90 L 30 65 L 45 75 L 60 35 L 75 50 L 95 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeIn", repeat:Infinity }}
          />
        </svg> */}
        {/* hero section */}
        <section>
          {/* <div className="box h-[7rem] w-[10rem] bg-red-700" id="box1"></div>
          <div className="box h-[7rem] w-[10rem] bg-red-500" id="box2"></div>
          <div className="box h-[7rem] w-[10rem] bg-red-400" id="box3"></div>
          <div className="box h-[7rem] w-[10rem] bg-red-300" id="box4"></div>
          <div className="box h-[7rem] w-[10rem] bg-red-200" id="box5"></div> */}
        </section>
        <section className="grid gap-10 lg:grid-cols-2 grid-cols-1 lg:items-center lg:mt-0 md:grid-cols-2 sm:mt-[2rem] mt-[1rem]">
          {/* left main */}
          <div className="space-y-5 pt-2 ml-5 lg:pt-0 md:col-span-1 mt-[1rem] sm:mt-[1rem] leftDiv">
            <span className="inline-flex mt-2 items-center gap-3 rounded-full border border-[#1848a0] bg-[#091739] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#4898ff] shadow-[0_0_0_1px_rgba(43,116,255,0.08)]">
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
              <div className="mt-4 flex flex-wrap gap-4">
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
          <div className="relative pt-2 lg:pt-0 lg:-mt-[5rem] md:col-span-1">
            <div className="relative min-h-[630px] overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_top,#20215a_0%,#11153c_36%,#090f27_100%)] p-0 shadow-[0_24px_80px_rgba(0,0,0,0.32)] after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(7,17,31,0.06)_0%,rgba(7,17,31,0.8)_100%)] after:content-['']">
              <img
                src={profileImage || siteContent.profileImage}
                alt={siteContent.profileImage}
                className="absolute inset-0 h-full w-full object-cover object-center myImage"
              />
            </div>
          </div>
        </section>
      </motion.div>

      <section
        className="mt-14 overflow-hidden"
        aria-labelledby="skills-showcase-title"
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-200">
            Toolbox
          </p>
        </div>
        <SkillsSwiper skills={siteContent.expertise} />
      </section>

      <motion.div
        className="mt-15"
        initial={{ opacity: 0 }}
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
          <div className="mt-14">
            <ExperienceCoverflow experiences={siteContent.experiences} />
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
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center text-[3.4rem]">
              <h2 className="mt-4 font-display font-extrabold leading-[0.92] text-white sm:text-[74px] lg:text-[94px]">
                Education
                <span className="mt-2 block bg-[linear-gradient(90deg,#31b8ff_0%,#59d7ff_34%,#7998ff_72%,#b55cff_100%)] bg-clip-text text-transparent">
                  Certifications
                </span>
              </h2>
            </div>
          </motion.div>

          <Swiper
            modules={[A11y, EffectCards, Keyboard, Navigation, Pagination]}
            effect="cards"
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            cardsEffect={{ perSlideOffset: 9, perSlideRotate: 2, rotate: true }}
            slidesPerView={1}
            a11y={{
              prevSlideMessage: "Show previous qualification",
              nextSlideMessage: "Show next qualification",
              paginationBulletMessage: "Show qualification {{index}}",
            }}
            className="mt-16 !px-1 !pb-12"
          >
            {educationCards.map((item, index) => (
              <SwiperSlide
                key={`${item.title}-${item.institution}`}
                className="!h-auto"
              >
                <motion.article
                  className="relative flex h-full w-[50rem] min-h-[20rem] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#131c2d] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.3)] sm:p-5"
                  initial={{ opacity: 0, x: 70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex items-start gap-5 ">
                      <div className="flex h-18 w-18 items-center justify-center rounded-[22px] bg-white text-3xl text-slate-700">
                        <i
                          className={
                            item.iconClass ?? "fa-solid fa-certificate"
                          }
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
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </motion.div>

      <motion.div
        className="mt-15 h-full"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <section id="education">
          <div>
            <h2 className="mt-8 font-display text-[58px] font-extrabold leading-[0.92] text-white sm:text-[74px] lg:text-[94px] py-5 text-center">
              Featured
              <span className="h-[7rem] block bg-[linear-gradient(90deg,#31b8ff_0%,#59d7ff_34%,#7998ff_72%,#b55cff_100%)] bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </div>
          <div className="project-showcase-shell">
            {projectsLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton-card overflow-hidden rounded-[36px] border border-white/10 bg-[#0f1728] shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
                  aria-hidden="true"
                >
                  <div className="relative h-[300px] overflow-hidden border-b border-white/8 bg-[#0a1020] sm:h-[360px]">
                    <div className="h-full w-full bg-white/6" />
                  </div>
                  <div className="bg-[linear-gradient(180deg,#0f1728_0%,#10162c_100%)] p-5 sm:p-5">
                    <div className="h-10 w-3/4 rounded-full bg-white/10" />
                    <div className="mt-6 h-4 w-full rounded-full bg-white/10" />
                    <div className="mt-3 h-4 w-11/12 rounded-full bg-white/10" />
                    <div className="mt-8 flex flex-wrap gap-3">
                      <div className="h-11 w-28 rounded-full bg-white/10" />
                      <div className="h-11 w-28 rounded-full bg-white/10" />
                      <div className="h-11 w-28 rounded-full bg-white/10" />
                    </div>
                    <div className="mt-10 h-16 w-full rounded-[22px] bg-white/10" />
                  </div>
                </div>
              ))
            ) : featuredProjects.length > 0 ? (
              <ProjectCoverflow projects={featuredProjects} />
            ) : (
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-200/76 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(103,240,221,0.22),0_18px_50px_rgba(52,214,197,0.12)] lg:col-span-2">
                {projectsError ||
                  "Featured projects are not available right now."}
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
