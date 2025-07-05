const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];
const logoIconsList = [
  {
    imgPath: "/images/logo2.png",
    name:"HTML"
  },
   {
    imgPath: "/images/logo1.png",
    name:"CSS"
  },

  {
    imgPath: "/images/logo3.png",
    name:"JavaScript"
  },
  {
    imgPath: "/images/logo4.png",
    name:"Tailwind CSS"
  },
  {
    imgPath: "/images/logo5.png",
    name:"React"
  },
  {
    imgPath: "/images/logo6.svg",
    name:"GSAP"
  },
  
  

];
const techStackIcons = [
  {
    name: "HTML",
    modelPath: "/models/html_logo-transformed.glb",
    scale: 0.3,
    rotation: [0, 0, 0],
  },
  {
    name: "CSS",
    modelPath: "/models/css-transformed.glb",
    scale: 20,
    rotation: [0, 0, 0],
  },
  {
    name: "JavaScript",
    modelPath: "/models/JavaScript-transformed.glb",
    scale: 20,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Tailwind CSS",
    modelPath: "/models/tailwind-css-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "React",
    modelPath: "/models/React-transformed.glb",
    scale: 3,
    rotation: [0, -Math.PI / 4, 0],
  },
];
const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Craftsmanship",
    desc: "I don’t just write code—I shape experiences. My work reflects a dedication to precision, consistency, and polish across every pixel. From fluid GSAP animations to responsive layouts crafted with Tailwind CSS, I approach every project with the mindset of a digital craftsman. It’s about more than functionality—it's about feeling. Every interaction, every color palette, every layout grid is a deliberate choice aimed at enhancing clarity, usability, and beauty.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Intentional Presence",
    desc: "I believe communication isn't about being the loudest—it's about being clear, consistent, and conscious in every interaction. Whether it's collaborating with teams or presenting ideas through user interfaces, I value depth over noise. My work reflects this mindset: well-documented code, responsive feedback loops, and carefully designed user flows that speak louder than words. I prefer to listen deeply, observe patterns, and contribute meaningfully—ensuring that what I build communicates reliability and thoughtfulness, even in silence.",
  },
  {
    imgPath: "/images/time.png",
    title: "Dependable Follow-Through",
    desc: "As a student, I’ve learned that success isn’t just about ideas—it’s about consistent execution. I pride myself on managing my time, setting realistic goals, and seeing projects through to completion. Whether it’s meeting assignment deadlines, contributing to team-based tasks, or pushing personal projects over the finish line, I value the trust that comes from reliability. My work reflects that: thoughtful planning, clear priorities, and a steady rhythm of progress.",
  },
];
const expCards = [
  {
    review:
      "Adrian brought creativity and technical expertise to the team, significantly improving our frontend performance. His work has been invaluable in delivering faster experiences.",
    imgPath: "/images/logo1.png",
    logoPath: "/images/logo1.png",
    title: "Frontend Developer",
    date: "January 2023 - Present",
    description: [
      "Developed and maintained user-facing features for the Hostinger website.",
      "Collaborated closely with UI/UX designers to ensure seamless user experiences.",
      "Optimized web applications for maximum speed and scalability.",
    ],
  },
  {
    review:
      "Adrian’s contributions to Docker's web applications have been outstanding. He approaches challenges with a problem-solving mindset.",
    imgPath: "/images/logo2.png",
    logoPath: "/images/logo2.png",
    title: "Full Stack Developer",
    date: "June 2020 - December 2023",
    description: [
      "Led the development of Docker's web applications, focusing on scalability.",
      "Worked with backend engineers to integrate APIs seamlessly with the frontend.",
      "Contributed to open-source projects that were used with the Docker ecosystem.",
    ],
  },
  {
    review:
      "Adrian’s work on Appwrite’s mobile app brought a high level of quality and efficiency. He delivered solutions that enhanced our mobile experience & meet our product goals.",
    imgPath: "/images/logo3.png",
    logoPath: "/images/logo3.png",
    title: "React Native Developer",
    date: "March 2019 - May 2020",
    description: [
      "Built cross-platform mobile apps using React Native, integrating with Appwrite's backend services.",
      "Improved app performance and user experience through code optimization and testing.",
      "Coordinated with the product team to implement features based on feedback.",
    ],
  },
];
export { navLinks, logoIconsList, abilities, expCards, techStackIcons };