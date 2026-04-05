import React from 'react';

function MeshGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top-left gradient */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--color-navy-500, #3e6cb1) 0%, transparent 70%)',
          opacity: 0.08,
          animation: 'mesh-float 20s ease-in-out infinite',
        }}
      />
      {/* Bottom-right gradient */}
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--color-gold-500, #d4a853) 0%, transparent 70%)',
          opacity: 0.06,
          animation: 'mesh-float 25s ease-in-out infinite reverse',
        }}
      />
      {/* Center accent */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--color-navy-400, #5b82bd) 0%, transparent 70%)',
          opacity: 0.05,
          animation: 'mesh-float 18s ease-in-out 5s infinite',
        }}
      />
    </div>
  );
}

export default MeshGradient;
