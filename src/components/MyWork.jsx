import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { FaCode, FaProjectDiagram, FaTools, FaRocket } from 'react-icons/fa';

function MyWork() {
  const myWorkItems = [
    { 
      title: 2, 
      suffix: "+", 
      description: "Years Learning", 
      icon: <FaCode className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      detail: "Dedicated to continuous learning and skill development"
    },
    { 
      title: 3, 
      suffix: "+", 
      description: "Projects Completed", 
      icon: <FaProjectDiagram className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      detail: "From simple websites to complex web applications"
    },
    { 
      title: 7, 
      suffix: "+", 
      description: "Technologies Mastered", 
      icon: <FaTools className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
      detail: "Modern web technologies and frameworks"
    },
    { 
      title: 100, 
      suffix: "%", 
      description: "Commitment", 
      icon: <FaRocket className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      detail: "Dedicated to delivering quality and innovation"
    },
  ];

  return (
    <section id='work' className="px-4 sm:px-6 lg:px-8 xl:mt-0 mt-32 scroll-mt-20">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            My Journey in Numbers
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A snapshot of my learning journey and achievements in web development
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8'>
          {myWorkItems.map((item, index) => (
            <motion.div 
              key={index} 
              className='group relative overflow-hidden'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Card Content */}
              <div className='relative bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-zinc-800/50 group-hover:border-pink-500/50 transition-all duration-300'>
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                
                {/* Number */}
                <div className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-2 my-work-number">
                  <CountUp 
                    suffix={item.suffix} 
                    end={item.title} 
                    duration={2.5} 
                    delay={index * 0.2}
                  />
                </div>
                
                {/* Description */}
                <div className='text-white text-base sm:text-lg font-medium mb-2'>
                  {item.description}
                </div>
                
                {/* Detail */}
                <div className='text-gray-400 text-xs sm:text-sm leading-relaxed'>
                  {item.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-6 sm:p-8 border border-pink-500/20">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Always Learning, Always Growing
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              I believe in continuous improvement and staying up-to-date with the latest web technologies. 
              Every project is an opportunity to learn something new and push the boundaries of what's possible on the web.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default MyWork;