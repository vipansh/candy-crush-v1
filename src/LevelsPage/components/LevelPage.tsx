import React from "react";
import { useGameData } from "../../context/GameDataContext";
import "../styles/LevelPage.css";
type Props = {};

const LevelPage = (props: Props) => {
  const { StartGameWithNewBord } = useGameData();
  return (
    <div className="hero-container">
      <div className="container">
        <div className="start-game game-full-flex" id="start-game">
          <div className="logo-holder">
            <p className="logo">Candy Crush</p>
            <button className="play-button" onClick={StartGameWithNewBord}>
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelPage;
