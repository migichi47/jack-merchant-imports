import { useRef } from "react";
import { GoDotFill } from "react-icons/go";
import {
  ArrowDown,
  ArrowRight,
  Handshake,
  Loader,
  ShieldCheck,
  Ship,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCars } from "../hooks/useCars";
import CarSlider from "./CarSlider";
import { SplitText } from "gsap/all";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Hero = () => {
  const { sliderVehicles } = useCars();
  const videoSectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingContainer = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();

  useGSAP(
    (_, contextSafe) => {
      const section = videoSectionRef.current;
      const video = videoRef.current;

      if (!section || !video || !contextSafe) return;
      const media = gsap.matchMedia();

      media.add("(max-width: 1023px)", () => {
        video.currentTime = 0;
        video.loop = true;
        video.playbackRate = 0.5;
        void video.play().catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "AbortError")
            return;
          console.error("Unable to autoplay the hero video", error);
        });
        return () => {
          video.pause();
          video.loop = false;
          video.playbackRate = 1;
          video.currentTime = 0;
        };
      });

      media.add("(min-width: 1024px)", () => {
        video.pause();
        video.loop = false;
        video.playbackRate = 1;
        const createScrollAnimation = contextSafe(() => {
          if (!Number.isFinite(video.duration) || video.duration <= 0) return;
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
              scrub: true,
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
      });

      return () => {
        media.revert();
      };
    },
    { scope: videoSectionRef },
  );

  useGSAP(() => {
    const splitHeading = SplitText.create(headingContainer.current, {
      type: "words",
    });
    const tl = gsap.timeline();

    tl.fromTo(
      "#pretext",
      {
        opacity: 0,
        yPercent: -100,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power1.inOut",
      },
    )
      .from(
        splitHeading.words,
        {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .from(
        "#description",
        {
          y: -40,
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
        },
        "-=1.5",
      )
      .from(
        "#hero-cta",
        {
          y: -50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power1.inOut",
        },
        "-=1",
      );
  });

  return (
    <>
      <section
        id="home"
        ref={videoSectionRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <video
          ref={videoRef}
          src="/videos/hero-car-optimised.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute z-0 inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute bg-linear-to-r from-black h-full w-fit
          pl-10 flex flex-col justify-center z-2"
        >
          <div className="flex flex-col justify-center gap-8 w-fit">
            <div
              id="pretext"
              className="text-2xl text-sans font-semibold flex gap-3 items-center text-gray-300"
            >
              IMPORT <GoDotFill className="text-red-700" /> DRIVE
              <GoDotFill className="text-red-700" /> ENJOY
            </div>
            <h2
              ref={headingContainer}
              className="text-8xl text-black font-bold max-w-260 bg-clip-text text-white"
            >
              Your Dream <span className="text-red-600">Car</span>, Imported
              with <span className="text-red-600">Care</span>
            </h2>
            <p
              id="description"
              className="text-xl text-sans font-semibold text-gray-400"
            >
              Reliable vehicle imports. Transparent process.
            </p>

            <div
              className="flex items-center gap-5 text-white relative top-20"
              id="hero-cta"
            >
              <button
                className="hero-cta flex items-center gap-2 bg-red-700 hover:bg-red-900 duration-300
                cursor-pointer py-3 px-4 rounded-full"
                onClick={() => navigate("#request-quote")}
              >
                Request a Quote <ArrowRight />
              </button>
              <button
                className="hero-cta flex items-center gap-2 py-3 px-4 rounded-full border
              border-white/50 cursor-pointer duration-300 hover:bg-white/10"
                onClick={() => navigate("#past-imports")}
              >
                View Past Imports <ArrowDown />
              </button>
            </div>
          </div>
          <div
            className="flex bg-linear-to-r from-white/10 via-white/80 to-white/20
            w-fit text-black mt-30 rounded-full px-10 py-3 relative left-250"
          >
            <div className="flex gap-3 items-center border-r-2 px-3">
              <ShieldCheck size={40} />
              <p className="w-20">Trusted & Reliable</p>
            </div>
            <div className="flex gap-3 items-center border-r-2 px-3">
              <Ship size={40} />
              <p className="w-20">Japan Sourcing</p>
            </div>
            <div className="flex gap-3 items-center border-r-2 px-3">
              <Handshake size={40} />
              <p className="w-20">Dedicated Support</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 px-2 flex items-center">
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
