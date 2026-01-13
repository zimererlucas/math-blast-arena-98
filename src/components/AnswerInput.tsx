import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Crosshair } from 'lucide-react';

interface AnswerInputProps {
  onSubmit: (answer: number) => void;
  disabled?: boolean;
}

const AnswerInput = ({ onSubmit, disabled }: AnswerInputProps) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() && !disabled) {
      onSubmit(parseInt(answer, 10));
      setAnswer('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="relative">
          <Crosshair className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-cyan" />
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Resposta..."
            disabled={disabled}
            className="w-48 pl-12 pr-4 py-3 rounded-full font-orbitron font-bold text-lg text-center
                       bg-cosmic-dark/80 border-2 border-neon-cyan text-foreground
                       placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan
                       disabled:opacity-50 disabled:cursor-not-allowed
                       [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ boxShadow: 'var(--shadow-neon-cyan)' }}
          />
        </div>
        <motion.button
          type="submit"
          disabled={disabled || !answer.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-full btn-neon disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-6 h-6 text-primary-foreground" />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AnswerInput;
