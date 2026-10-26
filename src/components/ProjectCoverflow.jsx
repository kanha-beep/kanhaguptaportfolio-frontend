import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  EffectCoverflow,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const projectImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
];

export default function ProjectCoverflow({ projects, compact = false }) {
  if (!projects?.length) return null;

  return (
    <Swiper
      className={`project-coverflow ${compact ? "project-coverflow--compact" : ""}`}
      modules={[A11y, EffectCoverflow, Keyboard, Navigation, Pagination, Scrollbar]}
      effect="coverflow"
      centeredSlides
      grabCursor
      slidesPerView="auto"
      spaceBetween={18}
      keyboard={{ enabled: true }}
      navigation
      pagination={{ clickable: true, dynamicBullets: true }}
      scrollbar={{ draggable: true, dragSize: "auto" }}
      lazyPreloadPrevNext={1}
      coverflowEffect={{
        rotate: 28,
        stretch: 0,
        depth: 140,
        modifier: 1.25,
        slideShadows: false,
      }}
      a11y={{
        prevSlideMessage: "Show previous project",
        nextSlideMessage: "Show next project",
        paginationBulletMessage: "Show project {{index}}",
      }}
    >
      {projects.map((project, index) => (
        <SwiperSlide key={project._id} className="project-coverflow__slide">
          <article className="group overflow-hidden rounded-[32px] border border-white/12 bg-[#0f1728] shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
            <div className="relative h-52 overflow-hidden border-b border-white/8 sm:h-64">
              <img
                src={projectImages[index % projectImages.length]}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,22,0.02),rgba(8,12,22,0.72))]" />
              <span className="absolute top-5 left-5 rounded-full border border-white/15 bg-slate-950/55 px-3 py-1.5 text-[10px] font-bold tracking-[0.22em] text-cyan-200 backdrop-blur">
                FEATURED {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-300/78">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.url_1 && (
                  <a
                    href={project.url_1}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
                  >
                    Open project ↗
                  </a>
                )}
                <Link
                  to={`/projects/${project._id}`}
                  className="rounded-xl border border-white/18 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Case study
                </Link>
              </div>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
