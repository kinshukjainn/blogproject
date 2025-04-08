import { motion } from "framer-motion";
import Header from "../components/Header";
import Post from "../components/Post";
import Footer from "../components/Footer";

const pageVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const ContentOnPage = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="flex flex-col font-mono min-h-screen bg-gradient-to-br from-[#1c1d1a] to-[#2d2e28]"
    >
      <Header />
      
      <main className="flex-grow pt-16">
        <Post />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default ContentOnPage;