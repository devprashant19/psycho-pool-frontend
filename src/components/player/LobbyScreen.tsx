import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { Users, Zap, Wifi } from 'lucide-react';

const LobbyScreen: React.FC = () => {
  const { currentPlayer, players } = useGame();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-grid relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon-cyan/20 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        {/* Welcome message */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl text-muted-foreground mb-2">Welcome,</h2>
          <h1 className="text-4xl font-display font-bold neon-text-cyan">
            {currentPlayer?.nickname}
          </h1>
        </motion.div>

        {/* Pulsating waiting animation */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mb-10"
        >
          <div className="w-32 h-32 mx-auto relative">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-neon-cyan/30"
              style={{
                borderTopColor: 'hsl(var(--neon-cyan))',
                boxShadow: '0 0 20px hsl(var(--neon-cyan) / 0.3)',
              }}
            />
            {/* Middle ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 rounded-full border-2 border-neon-magenta/30"
              style={{
                borderBottomColor: 'hsl(var(--neon-magenta))',
                boxShadow: '0 0 20px hsl(var(--neon-magenta) / 0.3)',
              }}
            />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Wifi className="w-10 h-10 text-neon-cyan" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Status text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-xl text-foreground font-display animate-pulse-neon">
            Waiting for Host to Start...
          </p>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span>{players.length} players connected</span>
          </div>
        </motion.div>

        {/* Player list preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
            {players.slice(0, 8).map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  player.id === currentPlayer?.id
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {player.nickname}
              </motion.div>
            ))}
            {players.length > 8 && (
              <div className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground">
                +{players.length - 8} more
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LobbyScreen;
