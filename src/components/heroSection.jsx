import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. Change Navigate to useNavigate

function Hero() {
  const navigate = useNavigate(); // 2. Initialize the function inside your component

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: "easeOut" } 
    },
  };

  return (
    <motion.section 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 variants={itemVariants} className="text-5xl font-bold mb-4">
        Analyze Your Resume Instantly
      </motion.h1>

      <motion.p variants={itemVariants} className="mb-6 text-lg">
        Get AI-powered feedback and improve your chances of getting hired.
      </motion.p>

      <motion.button 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        // 3. Use lowercase 'navigate' (the function you defined above)
        onClick={() => navigate("/analyze")} 
        className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow-lg cursor-pointer"
      >
        Upload Resume
      </motion.button>
    </motion.section>
  );
}

export default Hero;