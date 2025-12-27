import React from 'react';
import { Helmet } from 'react-helmet-async';
import PlayerView from '@/components/player/PlayerView';

const PlayerPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Play QuizSync | Real-time Multiplayer Trivia</title>
        <meta name="description" content="Join a QuizSync game and compete in real-time multiplayer trivia. Answer questions, beat the clock, and climb the leaderboard!" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Helmet>
      <PlayerView />
    </>
  );
};

export default PlayerPage;
