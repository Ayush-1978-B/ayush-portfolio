import React from "react";
import { motion } from "framer-motion";
import Title from "../Title";
import { FaExternalLinkAlt, FaGithub, FaEye } from "react-icons/fa";

const projects = [
  {
    title: "Netflix Clone",
    image: "/images/netflix.PNG",
    link: "https://netflixclone-e619c.web.app",
    github: "https://github.com/Ayush-1978-B/netflix-clone",
    description:
      "A responsive Netflix-inspired web app showcasing modern front-end techniques. Features include user authentication, movie browsing, and responsive design.",
    technologies: ["React", "Firebase", "CSS3", "JavaScript"],
    category: "Web Application"
  },
  {
    title: "✊ Rock Paper Scissors",
    image: "/images/game.jpeg",
    link: "https://ayush-1978-b.github.io/rock-paper/",
    github: "https://github.com/Ayush-1978-B/rock-paper",
    description: "A fun, interactive game built with React. Features animated feedback, score tracking, and smooth user interactions.",
    technologies: ["React", "CSS3", "JavaScript", "Animations"],
    category: "Game"
  },
  {
    title: "Amazon Clone",
    image: "/images/amazon.png",
    link: "https://clone-98984.web.app/",
    github: "https://github.com/Ayush-1978-B/amazon-clone",
    description: "A modern Amazon-inspired e-commerce UI clone. Includes product listings, shopping cart functionality, and responsive design.",
    technologies: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
    category: "E-commerce"
  },
];

function ProjectCompleted() {
  return (
    <section
      id="my-projects"
      className="w-full mt-20 px-4 sm:px-6 lg:px-8 py-10 md:py-20 flex items-center justify-center scroll-mt-20"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <Title title="Featured Projects" sub="💡 Showcasing My Work" />
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.18 },
            },
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="group bg-zinc-900/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-zinc-800/50 hover:border-pink-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15, type: "spring", stiffness: 80 }}
              whileHover={{ y: -8 }}
            >
              {/* Project Image */}
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub className="w-5 h-5" />
                  </motion.a>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-pink-500/20 backdrop-blur-sm text-pink-300 text-xs rounded-full border border-pink-500/30">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors duration-200">
                  {project.title}
                </h2>
                
                <p className="text-gray-300 text-sm sm:text-base mb-4 flex-1 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold text-sm mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded-md border border-zinc-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaEye className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-all duration-300 text-sm border border-zinc-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub className="w-4 h-4" />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-8 border border-pink-500/20">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Want to See More?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base mb-6 max-w-2xl mx-auto leading-relaxed">
              I'm constantly working on new projects and learning new technologies. 
              Let's discuss how I can help bring your ideas to life!
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectCompleted;
