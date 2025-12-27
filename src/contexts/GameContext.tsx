import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { GameState, Player, Question, GameData } from '@/services/socketService';

// Mock questions for testing
const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    text: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    timeLimit: 20,
    correctAnswer: 2,
  },
  {
    id: '2',
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    timeLimit: 20,
    correctAnswer: 1,
  },
  {
    id: '3',
    text: 'What is 15 × 7?',
    options: ['95', '105', '115', '125'],
    timeLimit: 15,
    correctAnswer: 1,
  },
];

interface GameContextType {
  // State
  gameState: GameState;
  currentRound: number;
  totalRounds: number;
  players: Player[];
  currentQuestion: Question | null;
  timeRemaining: number;
  currentPlayer: Player | null;
  countdown: number | null;
  selectedAnswer: number | null;
  answerResult: { correct: boolean; points: number } | null;

  // Player actions
  joinGame: (nickname: string) => void;
  submitAnswer: (answerIndex: number) => void;

  // Admin actions
  startRound: () => void;
  nextQuestion: () => void;
  showLeaderboard: () => void;
  endRound: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>('DISCONNECTED');
  const [currentRound, setCurrentRound] = useState(0);
  const [totalRounds] = useState(5);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<{ correct: boolean; points: number } | null>(null);

  // Timer effect for question
  useEffect(() => {
    if (gameState !== 'QUESTION_ACTIVE' || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - auto-submit if no answer
          if (selectedAnswer === null) {
            setAnswerResult({ correct: false, points: 0 });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeRemaining, selectedAnswer]);

  // Countdown effect
  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => {
        if (prev !== null && prev <= 1) {
          // Countdown finished - show question
          setGameState('QUESTION_ACTIVE');
          return null;
        }
        return prev !== null ? prev - 1 : null;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Player actions
  const joinGame = useCallback((nickname: string) => {
    const newPlayer: Player = {
      id: `player-${Date.now()}`,
      nickname,
      score: 0,
      rank: players.length + 1,
    };
    setCurrentPlayer(newPlayer);
    setPlayers((prev) => [...prev, newPlayer]);
    setGameState('LOBBY');
  }, [players.length]);

  const submitAnswer = useCallback((answerIndex: number) => {
    if (selectedAnswer !== null || !currentQuestion) return;

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const points = isCorrect ? Math.round(timeRemaining * 10) : 0;

    setAnswerResult({ correct: isCorrect, points });

    // Update player score
    if (currentPlayer) {
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === currentPlayer.id
            ? { ...p, score: p.score + points, lastAnswerCorrect: isCorrect }
            : p
        )
      );
      setCurrentPlayer((prev) =>
        prev ? { ...prev, score: prev.score + points, lastAnswerCorrect: isCorrect } : null
      );
    }
  }, [selectedAnswer, currentQuestion, timeRemaining, currentPlayer]);

  // Admin actions
  const startRound = useCallback(() => {
    setCurrentRound((prev) => prev + 1);
    setGameState('ROUND_LOADING');
    setCountdown(3);
    setQuestionIndex(0);
    
    // Set first question after countdown
    setTimeout(() => {
      const question = MOCK_QUESTIONS[0];
      setCurrentQuestion(question);
      setTimeRemaining(question.timeLimit);
      setSelectedAnswer(null);
      setAnswerResult(null);
    }, 3000);
  }, []);

  const nextQuestion = useCallback(() => {
    const nextIdx = questionIndex + 1;
    if (nextIdx >= MOCK_QUESTIONS.length) {
      setGameState('LEADERBOARD');
      return;
    }

    setGameState('ROUND_LOADING');
    setCountdown(3);
    setQuestionIndex(nextIdx);
    setSelectedAnswer(null);
    setAnswerResult(null);

    setTimeout(() => {
      const question = MOCK_QUESTIONS[nextIdx];
      setCurrentQuestion(question);
      setTimeRemaining(question.timeLimit);
    }, 3000);
  }, [questionIndex]);

  const showLeaderboard = useCallback(() => {
    // Sort players by score and assign ranks
    setPlayers((prev) => {
      const sorted = [...prev].sort((a, b) => b.score - a.score);
      return sorted.map((p, i) => ({ ...p, rank: i + 1 }));
    });
    setGameState('LEADERBOARD');
  }, []);

  const endRound = useCallback(() => {
    if (currentRound >= totalRounds) {
      setGameState('GAME_OVER');
    } else {
      setGameState('LOBBY');
    }
  }, [currentRound, totalRounds]);

  const resetGame = useCallback(() => {
    setGameState('DISCONNECTED');
    setCurrentRound(0);
    setPlayers([]);
    setCurrentQuestion(null);
    setQuestionIndex(0);
    setTimeRemaining(0);
    setCurrentPlayer(null);
    setCountdown(null);
    setSelectedAnswer(null);
    setAnswerResult(null);
  }, []);

  // Update current player rank when players change
  useEffect(() => {
    if (currentPlayer) {
      const updatedPlayer = players.find((p) => p.id === currentPlayer.id);
      if (updatedPlayer) {
        setCurrentPlayer(updatedPlayer);
      }
    }
  }, [players, currentPlayer]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        currentRound,
        totalRounds,
        players,
        currentQuestion,
        timeRemaining,
        currentPlayer,
        countdown,
        selectedAnswer,
        answerResult,
        joinGame,
        submitAnswer,
        startRound,
        nextQuestion,
        showLeaderboard,
        endRound,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
