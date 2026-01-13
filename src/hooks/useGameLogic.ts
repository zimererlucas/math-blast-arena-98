import { useState, useCallback, useEffect } from 'react';
import { Difficulty } from '@/components/DifficultySelect';

interface Enemy {
  id: number;
  x: number;
  y: number;
  problem: string;
  answer: number;
  isExploding: boolean;
}

interface GameState {
  score: number;
  lives: number;
  level: number;
  streak: number;
  enemies: Enemy[];
  isGameOver: boolean;
  correctAnswers: number;
  totalQuestions: number;
  playerX: number;
}

type Operation = '+' | '-' | '×' | '÷';

const generateProblem = (difficulty: Difficulty): { problem: string; answer: number } => {
  let num1: number, num2: number, answer: number, problem: string;
  let operations: Operation[] = ['+', '-'];
  let maxNum = 20;

  if (difficulty === 'medium') {
    operations = ['+', '-', '×', '÷'];
    maxNum = 50;
  } else if (difficulty === 'hard') {
    operations = ['+', '-', '×', '÷'];
    maxNum = 100;
  }

  const operation = operations[Math.floor(Math.random() * operations.length)];

  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * maxNum) + 1;
      num2 = Math.floor(Math.random() * maxNum) + 1;
      answer = num1 + num2;
      problem = `${num1} + ${num2}`;
      break;
    case '-':
      num1 = Math.floor(Math.random() * maxNum) + 1;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
      problem = `${num1} - ${num2}`;
      break;
    case '×':
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      answer = num1 * num2;
      problem = `${num1} × ${num2}`;
      break;
    case '÷':
      num2 = Math.floor(Math.random() * 12) + 1;
      answer = Math.floor(Math.random() * 12) + 1;
      num1 = num2 * answer;
      problem = `${num1} ÷ ${num2}`;
      break;
    default:
      num1 = 1;
      num2 = 1;
      answer = 2;
      problem = '1 + 1';
  }

  return { problem, answer };
};

const INITIAL_STATE: GameState = {
  score: 0,
  lives: 3,
  level: 1,
  streak: 0,
  enemies: [],
  isGameOver: false,
  correctAnswers: 0,
  totalQuestions: 0,
  playerX: 50,
};

export const useGameLogic = (difficulty: Difficulty) => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('starShooterHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const spawnEnemy = useCallback(() => {
    const { problem, answer } = generateProblem(difficulty);
    const newEnemy: Enemy = {
      id: Date.now() + Math.random(),
      x: Math.random() * 70 + 15,
      y: 15,
      problem,
      answer,
      isExploding: false,
    };

    setGameState((prev) => ({
      ...prev,
      enemies: [...prev.enemies, newEnemy],
    }));
  }, [difficulty]);

  const moveEnemies = useCallback(() => {
    setGameState((prev) => {
      const speed = 0.3 + (prev.level * 0.1);
      const updatedEnemies = prev.enemies
        .map((enemy) => ({
          ...enemy,
          y: enemy.isExploding ? enemy.y : enemy.y + speed,
        }))
        .filter((enemy) => !enemy.isExploding || enemy.y < 100);

      // Check if any enemy reached the bottom
      const escapedEnemies = updatedEnemies.filter(
        (e) => !e.isExploding && e.y >= 85
      );

      if (escapedEnemies.length > 0) {
        const newLives = prev.lives - escapedEnemies.length;
        const filteredEnemies = updatedEnemies.filter((e) => e.y < 85 || e.isExploding);

        if (newLives <= 0) {
          if (prev.score > highScore) {
            localStorage.setItem('starShooterHighScore', prev.score.toString());
            setHighScore(prev.score);
          }
          return {
            ...prev,
            lives: 0,
            enemies: filteredEnemies,
            isGameOver: true,
            streak: 0,
          };
        }

        return {
          ...prev,
          lives: newLives,
          enemies: filteredEnemies,
          streak: 0,
        };
      }

      return {
        ...prev,
        enemies: updatedEnemies,
      };
    });
  }, [highScore]);

  const submitAnswer = useCallback((answer: number) => {
    setGameState((prev) => {
      const targetEnemy = prev.enemies.find((e) => !e.isExploding && e.answer === answer);

      if (targetEnemy) {
        const newStreak = prev.streak + 1;
        const multiplier = Math.min(newStreak, 5);
        const baseScore = 100 * prev.level;
        const scoreGain = baseScore * multiplier;
        const newScore = prev.score + scoreGain;
        const newCorrect = prev.correctAnswers + 1;
        const shouldLevelUp = newCorrect % 5 === 0;

        return {
          ...prev,
          enemies: prev.enemies.map((e) =>
            e.id === targetEnemy.id ? { ...e, isExploding: true } : e
          ),
          score: newScore,
          streak: newStreak,
          correctAnswers: newCorrect,
          totalQuestions: prev.totalQuestions + 1,
          level: shouldLevelUp ? prev.level + 1 : prev.level,
          playerX: targetEnemy.x,
        };
      }

      // Wrong answer
      return {
        ...prev,
        streak: 0,
        totalQuestions: prev.totalQuestions + 1,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
  }, []);

  // Game loop for moving enemies
  useEffect(() => {
    if (gameState.isGameOver) return;

    const moveInterval = setInterval(moveEnemies, 50);
    return () => clearInterval(moveInterval);
  }, [moveEnemies, gameState.isGameOver]);

  // Spawn enemies
  useEffect(() => {
    if (gameState.isGameOver) return;

    const spawnInterval = setInterval(() => {
      if (gameState.enemies.filter((e) => !e.isExploding).length < 3 + Math.floor(gameState.level / 2)) {
        spawnEnemy();
      }
    }, 2000 - Math.min(gameState.level * 100, 1500));

    return () => clearInterval(spawnInterval);
  }, [spawnEnemy, gameState.level, gameState.isGameOver, gameState.enemies]);

  // Clean up exploding enemies
  useEffect(() => {
    const cleanup = setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        enemies: prev.enemies.filter((e) => !e.isExploding),
      }));
    }, 500);

    return () => clearTimeout(cleanup);
  }, [gameState.enemies]);

  return {
    ...gameState,
    highScore,
    submitAnswer,
    resetGame,
  };
};
