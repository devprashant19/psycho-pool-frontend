import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Smartphone, Monitor, Users, Trophy, Timer } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background bg-grid relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-72 h-72 bg-neon-cyan/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block mb-6"
          >
            <Zap 
              className="w-20 h-20 text-neon-cyan mx-auto" 
              style={{ filter: 'drop-shadow(0 0 20px hsl(var(--neon-cyan)))' }} 
            />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-display font-black mb-4">
            <span className="neon-text-cyan">Quiz</span>
            <span className="neon-text-magenta">Sync</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Real-time multiplayer trivia. Compete with friends. 
            <span className="text-neon-yellow"> Dominate the leaderboard.</span>
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { icon: Users, label: 'Multiplayer' },
              { icon: Timer, label: 'Real-time' },
              { icon: Trophy, label: 'Leaderboards' },
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border"
              >
                <feature.icon className="w-5 h-5 text-neon-cyan" />
                <span className="text-sm font-medium">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Entry Points */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Player Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-cyan/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card/80 backdrop-blur-sm border border-neon-cyan/30 rounded-2xl p-8 hover:border-neon-cyan/60 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
                  <Smartphone className="w-7 h-7 text-neon-cyan" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Player</h2>
                  <p className="text-muted-foreground">Mobile optimized</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Join a game with your nickname, answer questions in real-time, and compete for the top spot on the leaderboard.
              </p>
              <Link to="/play">
                <Button variant="neonCyan" size="lg" className="w-full">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Join as Player
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Admin Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta/20 to-neon-magenta/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card/80 backdrop-blur-sm border border-neon-magenta/30 rounded-2xl p-8 hover:border-neon-magenta/60 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-neon-magenta/20 flex items-center justify-center">
                  <Monitor className="w-7 h-7 text-neon-magenta" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground">Host</h2>
                  <p className="text-muted-foreground">Desktop dashboard</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Control the game flow, start rounds, push questions, and monitor live scores from your admin dashboard.
              </p>
              <Link to="/admin">
                <Button variant="neonMagenta" size="lg" className="w-full">
                  <Monitor className="w-5 h-5 mr-2" />
                  Open Admin Panel
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-muted-foreground text-sm mt-16"
        >
          Built for real-time multiplayer experiences • Socket.io ready
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
