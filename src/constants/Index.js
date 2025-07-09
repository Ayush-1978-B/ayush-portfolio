const navLinks = [
  {
    name: "Home",
    link: "#hero",
  },
  {
    name: "Work",
    link: "#work",
  },
    {
    name: "Projects",
    link: "#my-projects",
  },
  {
    name: "Skills",
    link: "#skills",
  },

  {
    name: "Contact Me",
    link: "#contact",
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
  },{
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
    rating: 5,
    description: "Semantic markup, accessibility, and modern HTML5 features for well-structured web pages.",
    category: "Frontend",
    icon: "🌐",
    color: "from-orange-500 to-red-500"
  },
  {
    name: "CSS",
    modelPath: "/models/css-transformed.glb",
    scale: 20,
    rotation: [0, 0, 0],
    rating: 4,
    description: "Modern CSS with Flexbox, Grid, animations, and responsive design techniques.",
    category: "Frontend",
    icon: "🎨",
    color: "from-blue-500 to-purple-500"
  },
  {
    name: "JavaScript",
    modelPath: "/models/JavaScript-transformed.glb",
    scale: 20,
    rotation: [0, -Math.PI / 2, 0],
    rating: 3,
    description: "ES6+ features, async programming, DOM manipulation, and modern JavaScript patterns.",
    category: "Programming",
    icon: "⚡",
    color: "from-yellow-400 to-orange-500"
  },
  {
    name: "Tailwind CSS",
    modelPath: "/models/tailwind-css-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
    rating: 4,
    description: "Utility-first CSS framework for rapid UI development and responsive design.",
    category: "Frontend",
    icon: "💨",
    color: "from-cyan-400 to-blue-500"
  },
  {
    name: "React",
    modelPath: "/models/React-transformed.glb",
    scale: 3,
    rotation: [0, -Math.PI / 4, 0],
    rating: 3,
    description: "Component-based architecture, hooks, state management, and modern React patterns.",
    category: "Frontend",
    icon: "⚛️",
    color: "from-blue-400 to-cyan-500"
  },
  {
    name: "Three.js",
    modelPath: "/models/React-transformed.glb",
    scale: 2,
    rotation: [0, -Math.PI / 4, 0],
    rating: 3,
    description: "3D graphics and animations for web applications with WebGL and modern 3D techniques.",
    category: "Graphics",
    icon: "🎮",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "GSAP",
    modelPath: "/models/React-transformed.glb",
    scale: 3,
    rotation: [0, -Math.PI / 4, 0],
    rating: 4,
    description: "Professional-grade animations and motion design for web applications.",
    category: "Animation",
    icon: "🎬",
    color: "from-green-400 to-teal-500"
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Digital Craftsmanship",
    desc: "I approach every project with the precision of a digital craftsman. From pixel-perfect layouts to smooth animations, I ensure every detail contributes to an exceptional user experience. My code is clean, well-documented, and follows modern best practices.",
    icon: "🎨",
    color: "from-purple-500 to-pink-500",
    features: ["Clean Code", "Best Practices", "Performance Optimization", "User Experience"]
  },
  {
    imgPath: "/images/chat.png",
    title: "Problem Solver",
    desc: "I thrive on turning complex challenges into elegant solutions. Whether it's debugging tricky issues or architecting scalable applications, I approach problems systematically and creatively. I believe in understanding the root cause before implementing solutions.",
    icon: "🧩",
    color: "from-blue-500 to-cyan-500",
    features: ["Analytical Thinking", "Creative Solutions", "Systematic Approach", "Debugging Skills"]
  },
  {
    imgPath: "/images/time.png",
    title: "Continuous Learner",
    desc: "The web development landscape evolves rapidly, and I stay ahead by constantly learning new technologies and techniques. I'm passionate about exploring emerging trends and integrating them into my work to deliver cutting-edge solutions.",
    icon: "🚀",
    color: "from-green-500 to-teal-500",
    features: ["Adaptability", "Latest Technologies", "Skill Development", "Innovation"]
  },
];

export { navLinks, logoIconsList, techStackIcons, abilities };