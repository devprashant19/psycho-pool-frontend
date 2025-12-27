import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Play, 
  SkipForward, 
  Trophy, 
  StopCircle, 
  Users, 
  Target,
  Zap,
  RotateCcw
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { 
    gameState, 
    currentRound, 
    totalRounds, 
    players, 
    currentQuestion,
    startRound, 
    nextQuestion, 
    showLeaderboard, 
    endRound,
    resetGame 
  } = useGame();

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-background bg-grid p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <Zap className="w-10 h-10 text-neon-cyan" style={{ filter: 'drop-shadow(0 0 10px hsl(var(--neon-cyan)))' }} />
          <div>
            <h1 className="text-3xl font-display font-bold neon-text-cyan">QuizSync</h1>
            <p className="text-muted-foreground">Admin Control Panel</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={resetGame}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Game
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="card-glow border-neon-cyan/30">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
                  <p className="text-3xl font-display font-bold text-neon-cyan">{players.length}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Live Players</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-glow border-neon-magenta/30">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 text-neon-magenta mx-auto mb-2" />
                  <p className="text-3xl font-display font-bold text-neon-magenta">{currentRound}/{totalRounds}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Round</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="card-glow border-neon-yellow/30">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-neon-yellow/20 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-lg font-display font-bold text-neon-yellow">Q</span>
                  </div>
                  <p className="text-3xl font-display font-bold text-neon-yellow">
                    {currentQuestion?.id || '-'}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Question</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="card-glow border-neon-green/30">
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center overflow-hidden">
                    <motion.div
                      animate={{
                        backgroundColor: [
                          'hsl(var(--neon-green) / 0.3)',
                          'hsl(var(--neon-cyan) / 0.3)',
                          'hsl(var(--neon-green) / 0.3)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <span className="text-xs font-display font-bold text-neon-green uppercase">
                        {gameState.slice(0, 3)}
                      </span>
                    </motion.div>
                  </div>
                  <p className="text-sm font-display font-bold text-neon-green truncate">
                    {gameState.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">State</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Control Deck */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-neon-cyan" />
                  Control Deck
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="neonCyan"
                    size="lg"
                    onClick={startRound}
                    disabled={gameState === 'QUESTION_ACTIVE' || gameState === 'ROUND_LOADING'}
                    className="h-20 flex-col gap-2"
                  >
                    <Play className="w-6 h-6" />
                    <span>Start Round</span>
                  </Button>

                  <Button
                    variant="neonMagenta"
                    size="lg"
                    onClick={nextQuestion}
                    disabled={gameState !== 'QUESTION_ACTIVE' && gameState !== 'LEADERBOARD'}
                    className="h-20 flex-col gap-2"
                  >
                    <SkipForward className="w-6 h-6" />
                    <span>Next Question</span>
                  </Button>

                  <Button
                    variant="neonYellow"
                    size="lg"
                    onClick={showLeaderboard}
                    disabled={gameState === 'LOBBY' || gameState === 'DISCONNECTED'}
                    className="h-20 flex-col gap-2"
                  >
                    <Trophy className="w-6 h-6" />
                    <span>Leaderboard</span>
                  </Button>

                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={endRound}
                    disabled={currentRound === 0}
                    className="h-20 flex-col gap-2"
                  >
                    <StopCircle className="w-6 h-6" />
                    <span>End Round</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current Question Preview */}
          {currentQuestion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="card-glow border-neon-cyan/20">
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">
                    Current Question
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-semibold mb-4">{currentQuestion.text}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          index === currentQuestion.correctAnswer
                            ? 'border-neon-green bg-neon-green/10'
                            : 'border-border bg-muted/30'
                        }`}
                      >
                        <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Live Leaderboard */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="card-glow h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-neon-yellow" />
                Live Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[600px] overflow-auto">
              {sortedPlayers.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No players connected yet
                </p>
              ) : (
                sortedPlayers.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      index === 0
                        ? 'bg-neon-yellow/10 border border-neon-yellow/30'
                        : index === 1
                        ? 'bg-gray-500/10 border border-gray-500/30'
                        : index === 2
                        ? 'bg-amber-600/10 border border-amber-600/30'
                        : 'bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                          index === 0
                            ? 'bg-neon-yellow/20 text-neon-yellow'
                            : index === 1
                            ? 'bg-gray-500/20 text-gray-300'
                            : index === 2
                            ? 'bg-amber-600/20 text-amber-500'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{player.nickname}</p>
                        {player.lastAnswerCorrect !== undefined && (
                          <p
                            className={`text-xs ${
                              player.lastAnswerCorrect ? 'text-neon-green' : 'text-neon-red'
                            }`}
                          >
                            {player.lastAnswerCorrect ? '✓ Correct' : '✗ Wrong'}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-display font-bold text-lg">
                      {player.score}
                    </span>
                  </motion.div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
