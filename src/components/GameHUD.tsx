import { Heart, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameHUDProps {
  score: number;
  lives: number;
  level: number;
  streak: number;
}

const GameHUD = ({ score, lives, level, streak }: GameHUDProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20">
      {/* Left side - Score and Level */}
      <div className="flex flex-col gap-2">
        <div className="glass-panel px-4 py-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-neon-yellow" />
            <span className="font-orbitron font-bold text-lg neon-text-yellow">
              {score.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="glass-panel px-4 py-2 rounded-lg">
          <span className="font-orbitron text-sm text-muted-foreground">
            Nível <span className="text-primary font-bold">{level}</span>
          </span>
        </div>
      </div>

      {/* Center - Streak counter */}
      {streak > 1 && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel px-6 py-2 rounded-lg neon-border-cyan border"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon-cyan" />
            <span className="font-orbitron font-bold neon-text-cyan">
              {streak}x COMBO
            </span>
          </div>
        </motion.div>
      )}

      {/* Right side - Lives */}
      <div className="glass-panel px-4 py-2 rounded-lg">
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={i < lives ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-6 h-6 ${
                  i < lives
                    ? 'text-destructive fill-destructive drop-shadow-[0_0_8px_hsl(0,84%,60%)]'
                    : 'text-muted-foreground/30'
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameHUD;
