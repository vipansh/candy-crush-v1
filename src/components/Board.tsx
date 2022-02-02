import { useEffect, useState } from "react";
import { CANDY_COLORS, WIDTH } from "../shared/Constant";
import { useGameData } from "../context/GameDataContext";
import { dragFunction } from "../utils/dragFunctions";
import ScoreBoard from "./ScoreBoard";

const Board = () => {
  const { currentColorArrangement, setCurrentColorArrangement, endGame } =
    useGameData();
  const { dragDrop, dragEnd, dragStart } = dragFunction();
  return (
    <div className="board-container">
      <div>
        <ScoreBoard />
        <div className="board">
          {currentColorArrangement.map((candyColor: string, index) => (
            <img
              key={index}
              src={candyColor}
              alt={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={() => dragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={() => dragDrop(index)}
              onDragEnd={dragEnd}
            />
          ))}
        </div>
        <button className="end-button" onClick={endGame}>End Game</button>
      </div>
    </div>
  );
};

export default Board;
