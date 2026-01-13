import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarField from '@/components/StarField';
import PlayerShip from '@/components/PlayerShip';
import EnemyShip from '@/components/EnemyShip';
import GameHUD from '@/components/GameHUD';
import AnswerInput from '@/components/AnswerInput';
import GameOver from '@/components/GameOver';
import DifficultySelect, { Difficulty } from '@/components/DifficultySelect';
import { useGameLogic } from '@/hooks/useGameLogic';

const GameContent = ({ difficulty }: { difficulty: Difficulty }) => {
  const navigate = useNavigate();
  const {
    score,
    lives,
    level,
    streak,
    enemies,
    isGameOver,
    correctAnswers,
    totalQuestions,
    playerX,
    highScore,
    submitAnswer,
    resetGame,
  } = useGameLogic(difficulty);

  return (
    <div className="relative w-full h-screen overflow-hidden game-bg">
      <StarField />

      <GameHUD score={score} lives={lives} level={level} streak={streak} />

      {/* Game area */}
      <div className="relative w-full h-full">
        {enemies.map((enemy) => (
          <EnemyShip
            key={enemy.id}
            id={enemy.id}
            x={enemy.x}
            y={enemy.y}
            problem={enemy.problem}
            isExploding={enemy.isExploding}
          />
        ))}

        <PlayerShip x={playerX} />
      </div>

      <AnswerInput onSubmit={submitAnswer} disabled={isGameOver} />

      {/* Instructions */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-muted-foreground text-sm font-exo">
          Escreve a resposta correta para destruir as naves inimigas! 🎯
        </p>
      </motion.div>

      {isGameOver && (
        <GameOver
          score={score}
          highScore={highScore}
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
          onRestart={resetGame}
          onHome={() => navigate('/')}
        />
      )}
    </div>
  );
};

const Game = () => {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  if (!difficulty) {
    return (
      <div className="relative w-full h-screen overflow-hidden game-bg">
        <StarField />
        <DifficultySelect onSelect={setDifficulty} />
      </div>
    );
  }

  return <GameContent difficulty={difficulty} />;
};

export default Game;
