import { motion } from "framer-motion";

function Features() {
  // Animation variants for the container (stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    /* Using min-h-[80vh] and py-32 to make the section feel much larger */
    <section className="min-h-[80vh] py-32 px-6 bg-gray-50 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900"
        >
          Powerful Features
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // Triggers when 20% of the section is visible
          className="grid md:grid-cols-3 gap-10"
        >
          {/* Feature Card 1 */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10 }} // Lifts card up on hover
            className="p-10 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6 font-bold">1</div>
            <h3 className="font-bold text-2xl mb-4 text-gray-800">AI Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              Our advanced neural networks scan your resume to provide deep, actionable insights.
            </p>
          </motion.div>

          {/* Feature Card 2 */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10 }}
            className="p-10 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6 font-bold">2</div>
            <h3 className="font-bold text-2xl mb-4 text-gray-800">ATS Score</h3>
            <p className="text-gray-600 leading-relaxed">
              Don't get filtered out. See exactly how automated systems rank your application.
            </p>
          </motion.div>

          {/* Feature Card 3 */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10 }}
            className="p-10 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center mb-6 font-bold">3</div>
            <h3 className="font-bold text-2xl mb-4 text-gray-800">Keyword Match</h3>
            <p className="text-gray-600 leading-relaxed">
              Match your skills to the job description automatically to stand out from the crowd.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default Features;