import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../Button";
import "../AnimatedBackground.css";
import "../AnimatedBackground3D.css";

const Hero = () => {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.fromTo(".hero-text-line",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2 }
    );

    tl.fromTo(".hero-subtitle",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    );

    tl.fromTo(".hero-button",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    );

    tl.fromTo(".hero-image",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5 },
      "-=0.8"
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden min-h-screen flex items-center hero-glow">
      <div className="relative z-20 grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto px-4">
        {/* LEFT: Hero Content */}
        <div className="flex flex-col items-start text-left text-white">
          <div className="hero-text font-semibold text-4xl md:text-5xl lg:text-6xl leading-tight hero-text-glow">
            <div className="hero-text-line overflow-hidden">
              <span>From Signals to Styling</span>
            </div>
            <div className="hero-text-line overflow-hidden">
              <span>My Web Dev Story Begins</span>
            </div>
          </div>
          <p className="hero-subtitle text-base md:text-lg max-w-xl mt-6">
            Hi, I’m Ayush — an ECE student at BIET Jhansi with a growing passion for web development. Though my core lies in electronics and communication, I’ve found my creative space in front-end development. I’m focused on mastering responsive design, modern UI frameworks, and building experiences that feel as good as they look.
          </p>
        </div>

        {/* RIGHT: Image */}
        <div className="hero-image flex justify-center relative">
          <img src="/images/ayush.png" alt="Ayush Yadav" className="w-2/3 md:w-full max-w-sm backdrop-blur-sm rounded-full shadow-2xl" />
          <div className="absolute top-0 right-0">
            <Button text="Downloadn CV" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;