import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Thumbs, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

const isImage = (value) => /\.(avif|gif|jpe?g|png|webp)(\?.*)?$/i.test(value ?? "");

// This only renders for genuine uploaded screenshots. It deliberately does not
// turn external live-project URLs into fake portfolio imagery.
export default function ProjectMediaGallery({ project }) {
  const media = [project?.image, ...(project?.images ?? []), project?.url_2].filter(isImage);

  if (!media.length) return null;

  return (
    <section className="mt-10" aria-labelledby="project-gallery-title">
      <p className="text-xs font-bold uppercase tracking-[.24em] text-cyan-200">Product screens</p>
      <h2 id="project-gallery-title" className="mt-2 font-display text-3xl font-semibold text-white">Explore the interface</h2>
      <Swiper
        modules={[A11y, Navigation, Pagination, Thumbs, Zoom]}
        className="project-media-gallery mt-6"
        navigation
        pagination={{ clickable: true }}
        zoom
        a11y={{ prevSlideMessage: "Show previous screenshot", nextSlideMessage: "Show next screenshot" }}
      >
        {media.map((url, index) => (
          <SwiperSlide key={`${url}-${index}`} zoom>
            <img src={url} alt={`${project.title} screenshot ${index + 1}`} loading="lazy" decoding="async" className="max-h-[560px] w-full rounded-2xl object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
