import { motion } from 'framer-motion';
import { Zap, Flame, Skull } from 'lucide-react';

export type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectProps {
  onSelect: (difficulty: Difficulty) => void;
}

const difficulties = [
  {
    id: 'easy' as Difficulty,
    name: 'Fácil',
    description: 'Adição e Subtração (1-20)',
    icon: Zap,
    color: 'neon-green',
    gradient: 'from-neon-green/20 to-neon-green/5',
  },
  {
    id: 'medium' as Difficulty,
    name: 'Médio',
    description: 'Todas operações (1-50)',
    icon: Flame,
    color: 'neon-yellow',
    gradient: 'from-neon-yellow/20 to-neon-yellow/5',
  },
  {
    id: 'hard' as Difficulty,
    name: 'Difícil',
    description: 'Todas operações (1-100)',
    icon: Skull,
    color: 'neon-magenta',
    gradient: 'from-neon-magenta/20 to-neon-magenta/5',
  },
];

const DifficultySelect = ({ onSelect }: DifficultySelectProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cosmic-dark/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="max-w-lg w-full mx-4 text-center"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <h2 className="font-orbitron text-3xl font-bold mb-2 neon-text-cyan">
          Escolhe a Dificuldade
        </h2>
        <p className="text-muted-foreground mb-8">
          Seleciona o nível de desafio para a tua missão espacial
        </p>

        <div className="space-y-4">
          {difficulties.map((difficulty, index) => {
            const Icon = difficulty.icon;
            return (
              <motion.button
                key={difficulty.id}
                onClick={() => onSelect(difficulty.id)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-6 rounded-xl glass-panel border border-${difficulty.color}/50 
                           bg-gradient-to-r ${difficulty.gradient} 
                           flex items-center gap-4 text-left group transition-all duration-300
                           hover:border-${difficulty.color}`}
              >
                <div className={`p-3 rounded-full bg-${difficulty.color}/20 group-hover:bg-${difficulty.color}/30 transition-colors`}>
                  <Icon className={`w-8 h-8 text-${difficulty.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-orbitron text-xl font-bold text-${difficulty.color}`}>
                    {difficulty.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {difficulty.description}
                  </p>
                </div>
                <div className={`opacity-0 group-hover:opacity-100 transition-opacity text-${difficulty.color}`}>
                  →
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DifficultySelect;
