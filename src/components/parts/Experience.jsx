import { motion } from 'framer-motion';
import { techStackIcons } from '../../constants/Index';
import Title from '../Title';
import { FaStar, FaCode, FaPalette, FaGamepad, FaFilm } from 'react-icons/fa';

function Experience() {
  const categories = [
    { name: "Frontend", icon: FaPalette, color: "from-blue-500 to-cyan-500" },
    { name: "Programming", icon: FaCode, color: "from-yellow-400 to-orange-500" },
    { name: "Graphics", icon: FaGamepad, color: "from-purple-500 to-pink-500" },
    { name: "Animation", icon: FaFilm, color: "from-green-400 to-teal-500" }
  ];

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.icon : FaCode;
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.color : "from-gray-500 to-gray-600";
  };

  return (
    <section
      id="skills"
      className="w-full mt-20 px-4 sm:px-6 lg:px-8 py-10 md:py-20 flex items-center justify-center scroll-mt-20"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <Title title="Skills & Experience" sub="🚀 My Technical Journey" />
        </div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {techStackIcons.map((tech, i) => {
            const IconComponent = getCategoryIcon(tech.category);
            const categoryColor = getCategoryColor(tech.category);
            
            return (
              <motion.div
                key={tech.name}
                className="group bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50 hover:border-pink-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, type: 'spring', stiffness: 80 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${categoryColor} flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform duration-300`}>
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{tech.name}</h3>
                    <span className="text-zinc-400 text-xs">{tech.category}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`w-4 h-4 ${
                          index < tech.rating
                            ? 'text-yellow-400'
                            : 'text-zinc-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-zinc-400 text-sm">{tech.rating}/5</span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {tech.description}
                </p>

                {/* Skill Level Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">Proficiency</span>
                    <span className="text-pink-400">{tech.rating * 20}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.rating * 20}%` }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Learning Journey */}
        <motion.div
          className="bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 border border-zinc-700/50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            My Learning Journey
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 to-purple-500"></div>
            
            <div className="space-y-8">
              {[
                {
                  year: "2025",
                  title: "Advanced Frontend Development",
                  description: "Mastering React ecosystem, Three.js for 3D graphics, and GSAP for professional animations. Building complex, interactive web applications.",
                  skills: ["React", "Three.js", "GSAP", "Advanced CSS"]
                },
                {
                  year: "2025",
                  title: "Modern Web Development",
                  description: "Deep dive into JavaScript ES6+, responsive design with Tailwind CSS, and building scalable component-based applications.",
                  skills: ["JavaScript ES6+", "Tailwind CSS", "Responsive Design"]
                },
                {
                  year: "2024",
                  title: "Web Development Fundamentals",
                  description: "Started with HTML5 and CSS3, learning semantic markup, responsive design, and modern CSS techniques.",
                  skills: ["HTML5", "CSS3"]
                }
              ].map((item, index) => (
                <motion.div
                  key={item.year + index}
                  className="relative pl-12"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-2 top-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full border-2 border-zinc-900"></div>
                  
                  <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/50">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-pink-500/20 text-pink-300 text-sm rounded-full border border-pink-500/30">
                        {item.year}
                      </span>
                      <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    </div>
                    
                    <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-zinc-700/50 text-zinc-300 text-xs rounded-md border border-zinc-600/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;