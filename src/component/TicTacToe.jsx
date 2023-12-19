import React, { useEffect, useState } from 'react';
import Board from './Board';
import GameOver from './GameOver';
import GameState from './GameState';
import Reset from './Reset';


const Player_X = 'X';
const Player_0 = '0';

const winningCombination = [
    // Row
    { combo: [0, 1, 2], strikeClass: 'strikeClass-row-1' },
    { combo: [3, 4, 5], strikeClass: 'strikeClass-row-2' },
    { combo: [6, 7, 8], strikeClass: 'strikeClass-row-3' },

    // Column
    { combo: [0, 3, 6], strikeClass: 'strikeClass-column-1' }, 
    { combo: [1, 4, 7], strikeClass: 'strikeClass-column-2' },  
    { combo: [2, 5, 8], strikeClass: 'strikeClass-column-3' },  

    // Diagonal
    { combo: [0, 4, 8], strikeClass: 'strikeClass-diagonal-1' },
    { combo: [2, 4, 6], strikeClass: 'strikeClass-diagonal-2' }
];

const checkWinner = (tiles, setStrikeClass, setGameState) => {
    for (const { combo, strikeClass } of winningCombination) {
        const tileValue1 = tiles[combo[0]];
        const tileValue2 = tiles[combo[1]];
        const tileValue3 = tiles[combo[2]];
        if (tileValue1 !== null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            setStrikeClass(strikeClass);
            if (tileValue1 === Player_X) {
                setGameState(GameState.playerXWins);
            } else {
                setGameState(GameState.player0Wins);
            }
            return;
        }
    }

    const areAllTilesFilledIn =  tiles.every((tile) => tile !== null);
    if (areAllTilesFilledIn) {
        setGameState(GameState.draw);
    }
};

const TicTacToe = () => {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(Player_X);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inProgress);  // Fix typo

    const handleTileClick = (index) => {
        if (gameState !== GameState.inProgress){
            return;
        }

        if (tiles[index] !== null) {
            return;
        }

        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        if (playerTurn === Player_X) {
            setPlayerTurn(Player_0);
        } else {
            setPlayerTurn(Player_X);
        }
    };

    const handleReset = () => {
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(Player_X);
        setStrikeClass(null);
    }

    useEffect(() => {
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles]);

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <Board tiles={tiles} onTileClick={handleTileClick} strikeClass={strikeClass} />
            <GameOver gameState={gameState} />
            <Reset gameState = {gameState} onReset = {handleReset}/>
        </div>
    );
};

export default TicTacToe;
