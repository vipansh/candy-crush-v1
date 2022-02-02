import React, { useEffect } from "react";
import { useGameData } from "../context/GameDataContext";
import LevelPage from "../LevelsPage/components/LevelPage";
import { useCheckForPattren } from "../utils/checkFunctions";
import Board from "./Board";

type Props = {};

const StartGamePage = (props: Props) => {
  const {
    gameStarted,
    StartGameWithNewBord,
    currentColorArrangement,
    setCurrentColorArrangement,
  } = useGameData();

  const { checkForPattren } = useCheckForPattren();

  const startNewGame = () => {
    StartGameWithNewBord();
  };
  useEffect(() => {
    const timer = setInterval(() => {
      checkForPattren();
    }, 300);
    return () => clearInterval(timer);
  }, [currentColorArrangement, setCurrentColorArrangement]);

  return <div>{gameStarted ? <Board /> : <LevelPage />}</div>;
};

export default StartGamePage;
