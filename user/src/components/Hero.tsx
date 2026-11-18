import { useRef } from "react";
import { Loader } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCars } from "../hooks/useCars";
import CarSlider from "./CarSlider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {
  const { sliderVehicles } = useCars();
  const videoSectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { contextSafe } = useGSAP({ scope: videoSectionRef });

  useGSAP(() => {
    const section = videoSectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const createScrollAnimation = contextSafe(() => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      video.pause();
      video.currentTime = 0;

      gsap.to(video, {
        currentTime: Math.max(0, video.duration - 0.1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            `+=${Math.round(Math.max(window.innerHeight * 2, video.duration * 300))}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    });

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      createScrollAnimation();
    } else {
      video.addEventListener("loadedmetadata", createScrollAnimation);
    }

    return () => {
      video.removeEventListener("loadedmetadata", createScrollAnimation);
    };
  }, [contextSafe]);

  return (
    <>
      <section
        ref={videoSectionRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <video
          ref={videoRef}
          src="/videos/hero-car-optimised.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </section>
      <section id="home" className="py-10 px-2 flex items-center">
        <div className="w-full mx-auto">
          {sliderVehicles.length === 0 ? <HeroFallback /> : <CarSlider />}
        </div>
      </section>
    </>
  );
};

export default Hero;

function HeroFallback() {
  return (
    <div
      className="bg-gray-100 overflow-hidden mb-8 mx-auto h-120 w-full sm:w-150 md:w-200 lg:w-300 flex items-center
    justify-center"
    >
      <div className="flex w-fit h-fit mx-auto text-lgsm:text-2xl font-semibold gap-2 items-center">
        Fetching vehicle <Loader className="animate-spin" />
      </div>
    </div>
  );
}
