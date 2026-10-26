import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectCoverflow, Keyboard, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ExperienceCoverflow({ experiences }) {
  return (
    <Swiper
      className="experience-coverflow"
      modules={[A11y, EffectCoverflow, Keyboard, Navigation, Pagination]}
      effect="coverflow"
      centeredSlides
      slidesPerView="auto"
      spaceBetween={22}
      grabCursor
      keyboard={{ enabled: true }}
      navigation
      pagination={{ clickable: true, dynamicBullets: true }}
      coverflowEffect={{ rotate: 22, depth: 135, modifier: 1.15, slideShadows: false }}
      a11y={{
        prevSlideMessage: "Show previous role",
        nextSlideMessage: "Show next role",
        paginationBulletMessage: "Show role {{index}}",
      }}
    >
      {experiences.map((experience, index) => (
        <SwiperSlide key={`${experience.company}-${experience.role}`} className="experience-coverflow__slide">
          <article className={`h-full min-h-[430px] rounded-[32px] border bg-[#111827] p-7 shadow-[0_30px_90px_rgba(0,0,0,.42)] sm:p-9 ${experience.accent === "violet" ? "border-[rgba(172,84,255,.3)]" : "border-[rgba(0,150,255,.3)]"}`}>
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/6 text-lg font-bold text-cyan-200">
                  {experience.company.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[.18em] text-cyan-200">ROLE {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">{experience.role}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[.1em] text-slate-300">{experience.company}</p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 border-y border-white/8 py-5 text-sm text-slate-300/70">
              <span>{experience.period}</span>
              <span>{experience.location}</span>
            </div>
            <ul className="mt-7 space-y-4">
              {experience.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-7 text-slate-200/85 sm:text-base">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_13px_rgba(103,240,221,.75)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
