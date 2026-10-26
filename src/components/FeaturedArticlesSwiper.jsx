import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectCreative, Keyboard, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeaturedArticlesSwiper({ posts }) {
  if (!posts?.length) return null;

  return (
    <Swiper
      className="featured-articles-swiper"
      modules={[A11y, EffectCreative, Keyboard, Navigation, Pagination]}
      effect="creative"
      grabCursor
      slidesPerView={1}
      keyboard={{ enabled: true }}
      navigation
      pagination={{ clickable: true }}
      creativeEffect={{
        prev: { shadow: true, translate: ["-115%", 0, -500], rotate: [0, 0, -8] },
        next: { shadow: true, translate: ["115%", 0, -500], rotate: [0, 0, 8] },
      }}
      a11y={{ prevSlideMessage: "Show previous article", nextSlideMessage: "Show next article" }}
    >
      {posts.map((post, index) => (
        <SwiperSlide key={post._id}>
          <Link
            to={`/blogs/${post._id}`}
            className="block min-h-[280px] rounded-[32px] border border-white/12 bg-[radial-gradient(circle_at_top_right,rgba(55,165,255,.28),transparent_38%),linear-gradient(135deg,#101c38,#15132a)] p-7 shadow-[0_28px_80px_rgba(0,0,0,.35)] sm:p-10"
          >
            <span className="text-xs font-bold tracking-[.24em] text-cyan-200">FEATURED NOTE · {String(index + 1).padStart(2, "0")}</span>
            <h2 className="mt-7 max-w-3xl font-display text-3xl font-semibold text-white sm:text-5xl">{post.title}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200/80 sm:text-base">{post.summary}</p>
            <span className="mt-9 inline-flex rounded-xl border border-white/18 bg-white/8 px-4 py-3 text-sm font-semibold text-white">Read article →</span>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
