import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { siteContent } from "../content/siteContent";
import MotionReveal from "../components/MotionReveal.jsx";
import MotionCard from "../components/MotionCard.jsx";

export default function Home() {
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
        console.error("Failed to load homepage projects:", projectsResult.reason);
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
    <main className="layout section-space">
      <MotionReveal>
      <section className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="space-y-8 pt-6 lg:pt-12">
          <span className="hero-availability">
            {siteContent.availability} • {siteContent.heroLocation}
          </span>
          <div>
            <h1 className="hero-name-line mt-7">{siteContent.firstName}</h1>
            <h1 className="hero-name-line hero-gradient-text mt-2">
              {siteContent.lastName}
            </h1>
            <div className="mt-10 flex items-center gap-3 text-[30px] text-slate-100 sm:text-[38px]">
              <span className="text-[#2f8cff]">&lt;/&gt;</span>
              <p className="text-[26px] font-light tracking-tight text-slate-300 sm:text-[38px]">
                Full Stack MERN Developer
              </p>
            </div>
            <div className="mt-8 max-w-2xl border-l border-[#2355a6] pl-8">
              <p className="text-[22px] leading-[1.7] text-slate-300/92 italic">
                "{siteContent.heroCopy}"
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              {/* <a href="#" className="hero-primary-button">
                ↓ Download CV
              </a> */}
              <Link to="/projects" className="hero-secondary-button">
                Explore Projects 🚀
              </Link>
            </div>
            <div className="mt-20 flex flex-wrap gap-x-8 gap-y-4">
              {siteContent.heroStack.map((item, index) => (
                <div key={item} className="hero-tech-item">
                  <span className="text-xl text-[#46a1ff]">
                    {index === 0 ? "◫" : index === 1 ? "◈" : index === 2 ? "◎" : "↗"}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative pt-4 lg:pt-0">
          <div className="hero-image bg-[radial-gradient(circle_at_top,#20215a_0%,#11153c_36%,#090f27_100%)] p-0">
            <img
              src={siteContent.profileImage}
              alt="Portfolio hero"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="hero-chat-card">
              <p className="text-[17px] leading-8 text-white">
                {siteContent.assistantMessage} What would you like to know?
              </p>
            </div>
            <div className="hero-dock">
              <div className="hero-dock-button hero-dock-button-active">⌂</div>
              <div className="hero-dock-button">🚀</div>
              <div className="hero-dock-button">📄</div>
              <div className="hero-dock-button">🐙</div>
              <div className="hero-dock-button">in</div>
            </div>
            <div className="hero-location-card">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#7ab6ff]">
                  Based In
                </p>
                <p className="mt-2 text-[20px] font-semibold">
                  {siteContent.basedIn}
                </p>
              </div>
              <div className="hero-spark">✦</div>
            </div>
          </div>
        </div>
      </section>
      </MotionReveal>

      <MotionReveal className="mt-28">
      <section>
        <div className="text-center">
          <span className="experience-pill">Work History</span>
          <h2 className="mt-8 font-display text-[58px] font-extrabold leading-[0.92] text-white sm:text-[74px] lg:text-[94px]">
            Professional
            <span className="hero-gradient-text block">Experience</span>
          </h2>
        </div>

        <div className="relative mt-20">
          <div className="experience-line" />
          <div className="grid gap-12">
            {siteContent.experiences.map((experience, index) => (
              <div
                key={`${experience.company}-${experience.role}`}
                className="grid items-start gap-6 lg:grid-cols-[1fr_80px_1fr]"
              >
                {index % 2 === 0 ? (
                  <>
                    <div />
                    <div className="relative hidden lg:block">
                      <div className="experience-dot" />
                    </div>
                    <MotionCard index={index}>
                    <article
                      className={`experience-card ${
                        experience.accent === "violet"
                          ? "experience-card-violet"
                          : "experience-card-blue"
                      }`}
                    >
                      <div className="flex items-start gap-5">
                        <div className="flex h-18 w-18 items-center justify-center rounded-3xl border border-white/8 bg-white/6 text-xl font-semibold text-slate-200">
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
                    </MotionCard>
                  </>
                ) : (
                  <>
                    <MotionCard index={index}>
                    <article
                      className={`experience-card ${
                        experience.accent === "violet"
                          ? "experience-card-violet"
                          : "experience-card-blue"
                      }`}
                    >
                      <div className="flex items-start gap-5">
                        <div className="flex h-18 w-18 items-center justify-center rounded-3xl border border-white/8 bg-white/6 text-xl font-semibold text-slate-200">
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
                    </MotionCard>
                    <div className="relative hidden lg:block">
                      <div className="experience-dot" />
                    </div>
                    <div />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      </MotionReveal>

      <MotionReveal className="mt-28">
      <section>
        <div className="text-center">
          <h2 className="mt-4 font-display text-[58px] font-extrabold leading-[0.92] text-white sm:text-[74px] lg:text-[94px]">
            Education &
            <span className="hero-gradient-text block">Certifications</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {siteContent.educationCards.map((item, index) => (
            <MotionCard key={`${item.title}-${item.institution}`} index={index}>
            <article className="education-card">
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-start gap-5">
                  <div className="education-icon">
                    {item.title.includes("Data") ? "IS" : item.title.includes("BCA") ? "🎓" : item.title.includes("XII") ? "📘" : "🏫"}
                  </div>
                  <div>
                    <h3 className="font-display text-[24px] font-semibold text-white sm:text-[30px]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[15px] text-slate-300/62">{item.year}</p>
                  </div>
                </div>
                <span
                  className={
                    item.accent === "gold"
                      ? "education-badge-gold"
                      : item.accent === "violet"
                        ? "education-badge-violet"
                        : "education-badge-blue"
                  }
                >
                  {item.badge}
                </span>
              </div>

              <div className="mt-8">
                <p className="text-[17px] font-semibold text-slate-100 underline decoration-white/15 underline-offset-4">
                  {item.institution}
                </p>
              </div>

              <div className="mt-8 border-t border-white/8 pt-8">
                <p className="text-[18px] leading-9 text-slate-300/78 italic">
                  "{item.note}"
                </p>
              </div>
            </article>
            </MotionCard>
          ))}
        </div>
      </section>
      </MotionReveal>

      <MotionReveal className="mt-28">
      <section>
        <div>
          <span className="experience-pill">Portfolio</span>
          <h2 className="mt-8 font-display text-[58px] font-extrabold leading-[0.92] text-white sm:text-[74px] lg:text-[94px]">
            Featured
            <span className="hero-gradient-text block">Projects</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {featuredProjects.length > 0 ? (
            featuredProjects.slice(0, 2).map((project, index) => (
              <MotionCard key={project._id} index={index}>
              <article className="project-frame">
                <div className="project-visual">
                  <img
                    src={
                      index === 0
                        ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
                        : "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1600&q=80"
                    }
                    alt={project.title}
                  />
                  <div className="project-overlay" />
                </div>

                <div className="project-content">
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
                      <span key={`${project._id}-${tag}`} className="project-pill">
                        {tag.replace(".js", "").toUpperCase()}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10">
                    <a
                      href={project.url_1}
                      target="_blank"
                      rel="noreferrer"
                      className={index === 0 ? "project-button-main" : "project-button-gradient"}
                    >
                      Explore Project ↗
                    </a>
                  </div>
                </div>
              </article>
              </MotionCard>
            ))
          ) : (
            <div className="glass-card p-6 text-sm leading-7 text-slate-200/76 lg:col-span-2">
              Your backend is already connected. Once your project entries or
              links are added, this area becomes the featured showcase.
            </div>
          )}
        </div>
      </section>
      </MotionReveal>

      <MotionReveal className="mt-20">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div className="overflow-hidden rounded-lg border border-white/10">
          <img
            src={siteContent.aboutImage}
            alt="Developer workspace"
            className="h-full min-h-[380px] w-full object-cover"
          />
        </div>
        <div>
          <span className="eyebrow">Latest Blogs</span>
          <h2 className="section-title mt-4">
            Writing slots into the same premium structure too.
          </h2>
          <p className="section-copy mt-4">
            Your blog posts keep the same dark theme, spacing, and hierarchy so
            the whole portfolio feels like one system rather than disconnected
            pages.
          </p>
          <div className="mt-8 grid gap-4">
            {latestPosts.length > 0 ? (
              latestPosts.map((post, index) => (
                <MotionCard key={post._id} index={index}>
                <Link
                  to={`/blogs/${post._id}`}
                  className="glass-card block p-6"
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
                </MotionCard>
              ))
            ) : (
              <div className="glass-card p-6 text-sm leading-7 text-slate-200/76">
                Blog entries from your CMS will appear here automatically.
              </div>
            )}
          </div>
        </div>
      </section>
      </MotionReveal>
    </main>
  );
}
