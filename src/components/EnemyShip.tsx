import { motion } from 'framer-motion';

interface EnemyShipProps {
  id: number;
  x: number;
  y: number;
  problem: string;
  isExploding?: boolean;
}

const EnemyShip = ({ x, y, problem, isExploding }: EnemyShipProps) => {
  if (isExploding) {
    return (
      <motion.div
        className="absolute w-20 h-24"
        style={{ left: `calc(${x}% - 40px)`, top: `${y}%` }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-neon-yellow via-neon-magenta to-destructive blur-lg" />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute w-20 z-10"
      style={{ left: `calc(${x}% - 40px)`, top: `${y}%` }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      {/* Math problem display */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="px-3 py-1 rounded-full glass-panel neon-border-magenta border-2">
          <span className="font-orbitron font-bold text-sm neon-text-magenta">
            {problem}
          </span>
        </div>
      </div>
      
      {/* Enemy ship body */}
      <svg viewBox="0 0 80 60" className="w-full h-16 drop-shadow-[0_0_15px_hsl(320,100%,60%)]">
        {/* Main hull - inverted compared to player */}
        <path
          d="M40 60 L60 30 L70 5 L55 10 L40 0 L25 10 L10 5 L20 30 Z"
          className="fill-neon-magenta"
        />
        {/* Evil cockpit */}
        <ellipse cx="40" cy="35" rx="10" ry="8" className="fill-cosmic-dark stroke-neon-magenta stroke-2" />
        {/* Spikes */}
        <path d="M10 5 L0 15 L15 20 Z" className="fill-neon-magenta opacity-80" />
        <path d="M70 5 L80 15 L65 20 Z" className="fill-neon-magenta opacity-80" />
        {/* Laser indicators */}
        <circle cx="25" cy="40" r="3" className="fill-destructive animate-pulse" />
        <circle cx="55" cy="40" r="3" className="fill-destructive animate-pulse" />
      </svg>
    </motion.div>
  );
};

export default EnemyShip;
