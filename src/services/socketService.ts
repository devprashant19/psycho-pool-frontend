import { io, Socket } from 'socket.io-client';

// Configuration - change this to your backend URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

// Socket instance (will be null until connected)
let socket: Socket | null = null;

// Game state types
export type GameState = 
  | 'DISCONNECTED'
  | 'LOBBY' 
  | 'ROUND_LOADING' 
  | 'QUESTION_ACTIVE' 
  | 'LEADERBOARD' 
  | 'GAME_OVER';

export interface Player {
  id: string;
  nickname: string;
  score: number;
  rank?: number;
  lastAnswerCorrect?: boolean;
  lastAnswerTime?: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  timeLimit: number;
  correctAnswer?: number;
}

export interface GameData {
  state: GameState;
  currentRound: number;
  totalRounds: number;
  players: Player[];
  currentQuestion: Question | null;
  timeRemaining: number;
}

// Socket event types
export interface ServerToClientEvents {
  'game:state': (data: GameData) => void;
  'game:countdown': (seconds: number) => void;
  'player:joined': (player: Player) => void;
  'player:left': (playerId: string) => void;
  'answer:result': (data: { correct: boolean; points: number }) => void;
}

export interface ClientToServerEvents {
  'player:join': (nickname: string) => void;
  'player:answer': (data: { questionId: string; answerIndex: number }) => void;
  'admin:start-round': () => void;
  'admin:next-question': () => void;
  'admin:show-leaderboard': () => void;
  'admin:end-round': () => void;
}

// Connect to the socket server
export const connectSocket = (): Socket => {
  if (!socket) {
    socket = io(BACKEND_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  
  if (!socket.connected) {
    socket.connect();
  }
  
  return socket;
};

// Disconnect from the socket server
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
  }
};

// Get the socket instance
export const getSocket = (): Socket | null => socket;

// Check if connected
export const isConnected = (): boolean => socket?.connected ?? false;

export { BACKEND_URL };
