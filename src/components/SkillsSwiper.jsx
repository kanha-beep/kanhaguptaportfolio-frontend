import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, FreeMode, Keyboard, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

export default function SkillsSwiper({ skills }) {
  if (!skills?.length) return null;

  return (
    <Swiper
      modules={[A11y, FreeMode, Keyboard, Scrollbar]}
      className="skills-swiper"
      slidesPerView="auto"
      spaceBetween={12}
      freeMode={{ momentum: true, momentumRatio: 0.55 }}
      scrollbar={{ draggable: true, dragSize: "auto" }}
      grabCursor
      keyboard={{ enabled: true }}
      a11y={{ containerMessage: "Draggable technology skills list" }}
    >
      {skills.map((skill, index) => (
        <SwiperSlide key={skill} className="skills-swiper__slide">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:border-cyan-200/45 hover:bg-cyan-200/10">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,240,221,.85)]" />
            {skill}
            <span className="text-[10px] tracking-[.16em] text-slate-400">{String(index + 1).padStart(2, "0")}</span>
          </span>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
