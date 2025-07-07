import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "../Title";
gsap.registerPlugin(ScrollTrigger);

function ProjectCompleted() {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 3 }
    );
    const projects = [
      project1Ref.current,
      project2Ref.current,
      project3Ref.current,
    ];
    projects.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: (index + 1) * 0.3,
          scrollTrigger: { trigger: card, start: "top bottom-=100" },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="my-projects"
      className=" w-full mt-20 px-5 md:px-20 py-10 md:py-20 flex items-center justify-center scroll-mt-20"
    >
      <div className="w-full">
        <div className="mb-10">
          <Title title="My Projects" sub="💡 What I Learne" />
        </div>
        <div className="flex xl:flex-row flex-col gap-10 justify-between">
          
            <div
              ref={project1Ref}
              className="h-full flex flex-col justify-between xl:w-[60%]"
            >
              <div className="xl:h-[70vh] md:h-[50vh] h-96 relative">
                <img
                  className=" w-full h-full  object-contain  rounded-xl absolute inset-0"
                  src="./images/netflix.PNG"
                  alt="coming soon"
                />
              </div>
              <div className="space-y-5 mt-5">
                <a className="hover:text-white-50 text-blue-500 " href="https://netflixclone-e619c.web.app" target="_blank" rel="noopener noreferrer">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  Netflix Clone
                </h2>
                </a>
                <p className="text-white-50 md:text-xl">
                  This project is a responsive Netflix-inspired web application
                  built to showcase modern front-end development techniques. It
                  replicates the sleek UI of Netflix, allowing users to browse a
                  curated selection of movies and TV shows with smooth
                  transitions and dynamic content rendering.
                </p>
              </div>
            </div>
         
          <div className="overflow-hidden flex md:flex-row flex-col xl:flex-col gap-10 xl:w-[40%]">
            <div className="project" ref={project2Ref}>
              <div className=" xl:h-[37vh] md:h-52 lg:h-72 h-64 relative rounded-xl xl:px-5 2xl:px-12 py-0">
                <img
                  className="w-full h-full object-contain rounded-xl bg-white-50"
                  src="./images/game.jpeg"
                  alt="cooming soon"
                />
              </div>
              <a className="hover:text-white-50 text-blue-500 " href="https://ayush-1978-b.github.io/rock-paper/" target="_blank" rel="noopener noreferrer">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mt-5">
              ✊ Rock Paper Scissors
              </h2>
              </a>
            </div>
            <div className="project" ref={project3Ref}>
              <div className=" xl:h-[37vh] md:h-52 lg:h-72 h-64 relative rounded-xl xl:px-5 2xl:px-12 py-0">
                <img
                  className="w-full h-full object-contain rounded-xl bg-white-50"
                  src="./images/amazon.png"
                  alt="cooming soon"
                />
              </div>
              <a className="hover:text-white-50 text-blue-500 " href="https://clone-98984.web.app/" target="_blank" rel="noopener noreferrer">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mt-5">
              Amazon Clone
              </h2>
              </a>
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mt-5">
                coming soon
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectCompleted;
