import React, { useContext, useState } from "react";
import { CANDY_COLORS, WIDTH } from "../shared/Constant";
interface IGameContext {
  score: number;
  currentColorArrangement: string[];
  setCurrentColorArrangement: React.Dispatch<React.SetStateAction<string[]>>;
  updateScore: (value: number) => void;
  gameStarted: boolean;
  StartGameWithNewBord: () => void;
  endGame: () => void;
  squareBeingDragged: number | null;
  setSquareBeingDragged: React.Dispatch<React.SetStateAction<number | null>>;
  squareBeingReplaced: number | null;
  setSquareBeingReplaced: React.Dispatch<React.SetStateAction<number | null>>;
  IncreaseMove: () => void;
  totalMoves: number;
}

const defaultState = {
  score: 0,
  gameStarted: false,
  updateScore: (value: number) => {},
  currentColorArrangement: [],
  setCurrentColorArrangement: () => {
    return [];
  },
  StartGameWithNewBord: () => {},
  endGame: () => {},
  squareBeingDragged: null,
  setSquareBeingDragged: () => {},
  squareBeingReplaced: null,
  setSquareBeingReplaced: () => {},
  IncreaseMove: () => {},
  totalMoves: 0,
};

const GameDataContext = React.createContext<IGameContext>(defaultState);

export function useGameData() {
  return useContext(GameDataContext);
}
interface GameDataProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const GameDataProvider: React.FC<GameDataProviderProps> = ({
  children,
}) => {
  const [score, setScore] = useState(0);
  const [totalMoves, setTotalMoves] = useState(0);

  const [currentColorArrangement, setCurrentColorArrangement] = useState<
    string[]
  >([]);
  const [gameStarted, setGameStarted] = useState(false);

  const [squareBeingDragged, setSquareBeingDragged] = useState<number | null>(
    null
  );
  const [squareBeingReplaced, setSquareBeingReplaced] = useState<number | null>(
    null
  );

  const updateScore = (value: number) => {
    setScore((score) => {
      return score + value;
    });
  };

  const IncreaseMove = () => {
    setTotalMoves((totalMoves) => {
      return totalMoves + 1;
    });
  };

  const StartGameWithNewBord = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      const randomColor =
        CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
    setGameStarted(true);
    setTotalMoves(0);
    setScore(0);
  };

  const endGame = () => {
    setGameStarted(false);
    setScore(0);
  };

  const value = {
    score,
    updateScore,
    gameStarted,
    endGame,
    currentColorArrangement,
    setCurrentColorArrangement,
    StartGameWithNewBord,
    squareBeingDragged,
    setSquareBeingDragged,
    squareBeingReplaced,
    setSquareBeingReplaced,
    IncreaseMove,
    totalMoves,
  };
  return (
    <GameDataContext.Provider value={value}>
      {children}
    </GameDataContext.Provider>
  );
};
