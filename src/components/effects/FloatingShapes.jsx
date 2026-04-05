import React from 'react';
import { motion } from 'framer-motion';

const shapes = [
  { type: 'circle', size: 120, x: '10%', y: '20%', delay: 0, duration: 12 },
  { type: 'hexagon', size: 80, x: '80%', y: '15%', delay: 2, duration: 15 },
  { type: 'circle', size: 60, x: '70%', y: '70%', delay: 4, duration: 10 },
  { type: 'triangle', size: 90, x: '20%', y: '75%', delay: 1, duration: 14 },
  { type: 'circle', size: 40, x: '50%', y: '50%', delay: 3, duration: 11 },
];

function Shape({ type, size }) {
  if (type === 'circle') {
    return (
      <div
        className="rounded-full border border-gold-500/15"
        style={{ width: size, height: size }}
      />
    );
  }
  if (type === 'hexagon') {
    return (
      <div
        className="border border-navy-500/10"
        style={{
          width: size,
          height: size,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: 'rgba(212, 168, 83, 0.05)',
        }}
      />
    );
  }
  // triangle
  return (
    <div
      className="border border-gold-500/10"
      style={{
        width: 0,
        height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size}px solid rgba(212, 168, 83, 0.06)`,
      }}
    />
  );
}

function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -25, 0, 20, 0],
            rotate: [0, 5, -3, 5, 0],
            scale: [1, 1.05, 0.95, 1.03, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        >
          <Shape type={shape.type} size={shape.size} />
        </motion.div>
      ))}
    </div>
  );
}

export default FloatingShapes;
