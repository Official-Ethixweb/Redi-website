import { useCallback, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Testimonial } from '@/types/wordpress';

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: Props) {
  const [[index, direction], setState] = useState<[number, 1 | -1]>([0, 1]);
  const prefersReducedMotion = useReducedMotion();

  const paginate = useCallback(
    (dir: 1 | -1) => {
      setState(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir]);
    },
    [testimonials.length],
  );

  const active = testimonials[index]!;

  const slideVariants = {
    enter: (dir: 1 | -1) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir * 48,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: 1 | -1) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir * -48,
    }),
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="bg-navy-900 relative isolate overflow-hidden"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={`bg-${active.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <img
            src={active.backgroundImage.url}
            alt=""
            className="size-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="from-navy-950/70 via-navy-800/45 to-navy-900/35 absolute inset-0 bg-gradient-to-r" />
        </motion.div>
      </AnimatePresence>

      <div className="container-page relative flex min-h-[730px] items-center justify-end py-20">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.figure
            key={active.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-steel-100 shadow-lifted w-full max-w-[330px] rounded-xl p-8"
            aria-roledescription="slide"
            aria-label={`Testimonial ${index + 1} of ${testimonials.length}: ${active.companyName}`}
          >
            <img
              src={active.companyLogo.url}
              alt={active.companyLogo.alt}
              width={440}
              height={176}
              className="h-14 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="font-heading text-ink-900 mt-5 text-lg font-bold tracking-normal uppercase">
              {active.companyName}
            </figcaption>
            <svg
              viewBox="0 0 40 24"
              className="fill-navy-700 mt-4 h-6 w-10"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M9.5 0C4.3 0 0 4.3 0 9.6c0 5.2 4.2 9.5 9.4 9.6l-3 4.8h6.2l4.3-7.1c1-1.7 1.6-3.7 1.6-5.7V9.6C18.5 4.3 14.7 0 9.5 0Zm21 0c-5.2 0-9.5 4.3-9.5 9.6 0 5.2 4.2 9.5 9.4 9.6l-3 4.8h6.2l4.3-7.1c1-1.7 1.6-3.7 1.6-5.7V9.6C39.5 4.3 35.7 0 30.5 0Z" />
            </svg>
            <blockquote className="text-ink-600 mt-3 text-[15px] leading-relaxed">
              {active.quote}
            </blockquote>
            <p className="font-heading text-ink-900 mt-5 text-right text-sm font-bold tracking-wide uppercase">
              {active.personName}
            </p>
            <p className="font-heading text-ink-600 mt-1.5 text-right text-xs font-medium tracking-wide uppercase">
              {active.personTitle}
            </p>
          </motion.figure>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous testimonial"
          className="bg-steel-100/90 text-navy-950 shadow-card absolute top-1/2 left-6 flex size-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-white focus-visible:ring-[3px] focus-visible:ring-cyan-400 sm:left-8 lg:left-10"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next testimonial"
          className="bg-steel-100/90 text-navy-950 shadow-card absolute top-1/2 right-6 flex size-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:bg-white focus-visible:ring-[3px] focus-visible:ring-cyan-400 sm:right-8 lg:right-10"
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
