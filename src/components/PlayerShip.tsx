import { motion } from 'framer-motion';

interface PlayerShipProps {
  x: number;
}

const PlayerShip = ({ x }: PlayerShipProps) => {
  return (
    <motion.div
      className="absolute bottom-8 w-16 h-20 z-10"
      style={{ left: `calc(${x}% - 32px)` }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Ship body */}
      <svg viewBox="0 0 64 80" className="w-full h-full drop-shadow-[0_0_15px_hsl(190,100%,50%)]">
        {/* Main hull */}
        <path
          d="M32 0 L48 35 L52 70 L40 65 L32 80 L24 65 L12 70 L16 35 Z"
          className="fill-neon-cyan"
          filter="url(#glow)"
        />
        {/* Cockpit */}
        <ellipse cx="32" cy="30" rx="8" ry="12" className="fill-cosmic-dark stroke-neon-cyan stroke-2" />
        {/* Wings */}
        <path
          d="M16 35 L0 55 L8 60 L16 50 Z"
          className="fill-neon-cyan opacity-80"
        />
        <path
          d="M48 35 L64 55 L56 60 L48 50 Z"
          className="fill-neon-cyan opacity-80"
        />
        {/* Engine glow */}
        <ellipse cx="32" cy="72" rx="6" ry="8" className="fill-neon-yellow opacity-80" />
        <ellipse cx="20" cy="68" rx="4" ry="6" className="fill-neon-yellow opacity-60" />
        <ellipse cx="44" cy="68" rx="4" ry="6" className="fill-neon-yellow opacity-60" />
        
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
};

export default PlayerShip;
