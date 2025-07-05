
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../Button";
import HeroExperinces from "../Heromodels/HeroExperinces";
import MyWork from "../MyWork";

const Hero = () => {
  const words = [
    { text: 'Ideas', },
    { text: 'Designs', },
    { text: 'Experiences', },
  ];
  useGSAP(() => {
    gsap.fromTo('#hero-text h1',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.5, ease: 'power2.inOut' },
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/src/images/bg.png" alt="" />
      </div>

      <div className="relative z-10 xl:mt-20 mt-32 md:h-dvh h-[80vh] flex  xl:items-center items-start justify-center">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7 ">
            <div>
              <p className="text-white-50 md:text-[15px] text-[15px] relative z-10 pointer-events-none flex-wrap">
                Hi, I’m Ayush — an ECE student at BIET Jhansi with a growing passion for web development.
                Though my core lies in electronics and communication, I’ve found my creative space in front-end development.
                I’m focused on mastering responsive design, modern UI frameworks, and building experiences that feel as good as they look.
              </p>
            </div>
            <div id="hero-text" className="flex flex-col justify-center md:text-[60px] text-[30px] font-semibold relative z-10 pointer-events-none">
              <h1>
                From Signals to Styling — My Web Dev Story Begins
                <span className="slide absolute pt-0 px-2 md:px-5 py-[30px] h-[48px] md:h-[78px] md:translate-y-1 translate-y-0 overflow-hidden">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>
            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="xl:w-[70%] w-full h-full min-h-[50vh] absolute xl:-top-20 top-24 xl:-right-20 right-0">
            <HeroExperinces />
          </div>
        </figure>
      </div>
      <MyWork />
    </section>
  );
};

export default Hero;