import React from 'react';
import GameState from './GameState';

const GameOver = ({gameState}) => {
    switch(gameState){
        case GameState.inProgress:
            return <div></div>
        case GameState.player0Wins:
            return <div className='game-over'>🥳🎉 "0" Wins 🥳🎉</div>
        case GameState.playerXWins:
            return <div className='game-over'>🎉🥳 "X" Wins 🎉🥳</div>
        case GameState.draw:
            return <div className='game-over'>😟🥺Game-Draw😟🥺</div>
        default:
            return <div></div>
    }
}

export default GameOver;