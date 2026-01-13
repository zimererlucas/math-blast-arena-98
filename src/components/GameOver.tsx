import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home } from 'lucide-react';

interface GameOverProps {
  score: number;
  highScore: number;
  correctAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
  onHome: () => void;
}

const GameOver = ({ score, highScore, correctAnswers, totalQuestions, onRestart, onHome }: GameOverProps) => {
  const isNewHighScore = score >= highScore && score > 0;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cosmic-dark/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="glass-panel p-8 rounded-2xl max-w-md w-full mx-4 text-center border border-border"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <Trophy className={`w-20 h-20 mx-auto mb-4 ${isNewHighScore ? 'text-neon-yellow' : 'text-muted-foreground'}`} 
                  style={isNewHighScore ? { filter: 'drop-shadow(0 0 20px hsl(45, 100%, 60%))' } : {}} />
        </motion.div>

        <h2 className="font-orbitron text-3xl font-bold mb-2 neon-text-magenta">
          Fim de Jogo!
        </h2>

        {isNewHighScore && (
          <motion.p
            className="font-orbitron text-lg neon-text-yellow mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            🎉 Novo Recorde! 🎉
          </motion.p>
        )}

        <div className="space-y-4 mb-8">
          <div className="glass-panel p-4 rounded-lg">
            <p className="text-muted-foreground text-sm">Pontuação Final</p>
            <p className="font-orbitron text-4xl font-bold neon-text-cyan">
              {score.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-3 rounded-lg">
              <p className="text-muted-foreground text-xs">Melhor Pontuação</p>
              <p className="font-orbitron text-xl font-bold text-neon-yellow">
                {Math.max(score, highScore).toLocaleString()}
              </p>
            </div>
            <div className="glass-panel p-3 rounded-lg">
              <p className="text-muted-foreground text-xs">Precisão</p>
              <p className="font-orbitron text-xl font-bold text-neon-green">
                {accuracy}%
              </p>
            </div>
          </div>

          <div className="text-muted-foreground text-sm">
            Respostas corretas: {correctAnswers}/{totalQuestions}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={onHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-muted-foreground/30 font-orbitron font-bold hover:bg-muted/50 transition-colors"
          >
            <Home className="w-5 h-5" />
            Menu
          </motion.button>
          <motion.button
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full btn-neon font-orbitron font-bold"
          >
            <RotateCcw className="w-5 h-5" />
            Jogar Novamente
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOver;
