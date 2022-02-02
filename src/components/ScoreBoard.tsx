import { useGameData } from "../context/GameDataContext";

const ScoreBoard = () => {
  const { score, totalMoves } = useGameData();

  return (
    <div className="score-board">
      <h2>Score: {score}</h2>
      <h2>Move: {totalMoves}</h2>
    </div>
  );
};

export default ScoreBoard;
