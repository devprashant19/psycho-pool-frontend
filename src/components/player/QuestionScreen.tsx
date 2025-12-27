import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { Check, X } from 'lucide-react';

const optionColors = [
  { bg: 'bg-neon-red/20', border: 'border-neon-red', text: 'text-neon-red', shadow: 'shadow-[0_0_20px_hsl(var(--neon-red)/0.5)]' },
  { bg: 'bg-neon-cyan/20', border: 'border-neon-cyan', text: 'text-neon-cyan', shadow: 'shadow-[0_0_20px_hsl(var(--neon-cyan)/0.5)]' },
  { bg: 'bg-neon-yellow/20', border: 'border-neon-yellow', text: 'text-neon-yellow', shadow: 'shadow-[0_0_20px_hsl(var(--neon-yellow)/0.5)]' },
  { bg: 'bg-neon-green/20', border: 'border-neon-green', text: 'text-neon-green', shadow: 'shadow-[0_0_20px_hsl(var(--neon-green)/0.5)]' },
];

const QuestionScreen: React.FC = () => {
  const { currentQuestion, timeRemaining, selectedAnswer, answerResult, submitAnswer } = useGame();

  if (!currentQuestion) return null;

  const progressPercent = (timeRemaining / currentQuestion.timeLimit) * 100;

  return (
    <div className="min-h-screen flex flex-col p-4 pt-6 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Timer bar */}
        <div className="mb-6">
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full transition-colors duration-300 ${
                progressPercent > 50
                  ? 'bg-neon-green'
                  : progressPercent > 25
                  ? 'bg-neon-yellow'
                  : 'bg-neon-red'
              }`}
              style={{
                width: `${progressPercent}%`,
                boxShadow:
                  progressPercent > 50
                    ? '0 0 15px hsl(var(--neon-green))'
                    : progressPercent > 25
                    ? '0 0 15px hsl(var(--neon-yellow))'
                    : '0 0 15px hsl(var(--neon-red))',
              }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground font-display">
            <span>{timeRemaining}s</span>
            <span>Question {currentQuestion.id}</span>
          </div>
        </div>

        {/* Question text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-shrink-0 mb-6"
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border">
            <h1 className="text-xl md:text-2xl font-bold text-center text-foreground leading-relaxed">
              {currentQuestion.text}
            </h1>
          </div>
        </motion.div>

        {/* Answer options */}
        <div className="flex-1 grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, index) => {
            const color = optionColors[index];
            const isSelected = selectedAnswer === index;
            const isCorrect = currentQuestion.correctAnswer === index;
            const showResult = selectedAnswer !== null;

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => submitAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`
                  relative w-full p-4 rounded-xl border-2 font-semibold text-lg
                  transition-all duration-300 text-left
                  ${
                    showResult
                      ? isCorrect
                        ? 'border-neon-green bg-neon-green/20 shadow-[0_0_25px_hsl(var(--neon-green)/0.6)]'
                        : isSelected
                        ? 'border-neon-red bg-neon-red/20 shadow-[0_0_25px_hsl(var(--neon-red)/0.6)]'
                        : 'border-border bg-muted/30 opacity-50'
                      : isSelected
                      ? `${color.border} ${color.bg} ${color.shadow}`
                      : `border-border bg-card/50 hover:${color.border} hover:${color.bg}`
                  }
                  disabled:cursor-default
                `}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-lg ${
                      showResult
                        ? isCorrect
                          ? 'bg-neon-green text-background'
                          : isSelected
                          ? 'bg-neon-red text-background'
                          : 'bg-muted text-muted-foreground'
                        : `${color.bg} ${color.text}`
                    }`}
                  >
                    {showResult && isCorrect ? (
                      <Check className="w-5 h-5" />
                    ) : showResult && isSelected && !isCorrect ? (
                      <X className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className="flex-1 text-foreground">{option}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Result feedback */}
        {answerResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center"
          >
            <div
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-lg ${
                answerResult.correct
                  ? 'bg-neon-green/20 text-neon-green neon-border-green border'
                  : 'bg-neon-red/20 text-neon-red border border-neon-red'
              }`}
            >
              {answerResult.correct ? (
                <>
                  <Check className="w-5 h-5" />
                  +{answerResult.points} points!
                </>
              ) : (
                <>
                  <X className="w-5 h-5" />
                  Wrong answer
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuestionScreen;
