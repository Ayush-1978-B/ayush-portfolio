
import { abilities } from '../../constants/Index';
import GlowCard from '../GlowCard';
import { motion } from 'framer-motion';

function Features() {
  return (
    <div className="w-full padding-x-lg px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
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
        {abilities.map((ability, i) => (
          <motion.div
            key={ability.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15, type: 'spring', stiffness: 80 }}
            whileHover={{ scale: 1.02, y: -8 }}
          >
            <GlowCard className="card-border rounded-2xl p-6 sm:p-8 flex flex-col h-full group">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${ability.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {ability.icon}
                </div>
                <h3 className="text-white text-xl sm:text-2xl font-bold">{ability.title}</h3>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 flex-1">
                {ability.desc}
              </p>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold text-sm sm:text-base mb-3">Key Strengths:</h4>
                <div className="flex flex-wrap gap-2">
                  {ability.features.map((feature, index) => (
                    <motion.span
                      key={feature}
                      className="px-3 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded-full border border-zinc-700/50 group-hover:border-pink-500/30 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (i * 0.15) + (index * 0.05) }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Decorative Element */}
              <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-r ${ability.color} opacity-5 rounded-full blur-xl group-hover:opacity-10 transition-opacity duration-300`}></div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Features;