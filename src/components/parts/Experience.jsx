import Title from '../Title'
import { techStackIcons } from '../../constants/Index'
import TechIcon from '../Models/TechIcon'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LgoSection from '../LgoSection'
gsap.registerPlugin(ScrollTrigger)

const Star = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-600"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
  </svg>
);

const Rating = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star key={i} filled={i < rating} />
    ))}
  </div>
);

const Experience = () => {
  useGSAP(() => {
    gsap.utils.toArray(".skill-card").forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <section
      id="skills"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0 scroll-mt-20"
    >
      <div className="w-full h-full md:px-20 px-5">
        <Title
          title="My Skills"
          sub="🚀 Technologies I Work With"
        />
        <LgoSection/>
        <div className="mt-20 grid grid-cols-1 gap-16">
          {techStackIcons.map((skill, index) => (
            <div
              key={skill.name}
              className={`skill-card flex items-center gap-8 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="w-1/3 text-3xl font-semibold">
                <h3 className={index % 2 === 0 ? "text-right" : "text-left"}>
                  {skill.name}
                </h3>
              </div>
              <div className="w-1/3 h-48 flex items-center justify-center">
                <TechIcon model={skill} />
              </div>
              <div className="w-1/3">
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                  <Rating rating={skill.rating} />
                  <p className="text-sm mt-2 text-gray-300">{skill.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Experience