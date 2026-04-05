import React from 'react';
import { motion, useScroll } from 'framer-motion';

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gold-500 origin-left z-[9998]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export default ScrollProgressBar;
