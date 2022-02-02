import { useGameData } from "../context/GameDataContext";
import { WIDTH } from "../shared/Constant";
import blank from "../images/blank.png";

import { useCheckForPattren } from "./checkFunctions";
let points = 0;

export const dragFunction = () => {
  const {
    setSquareBeingDragged,
    setSquareBeingReplaced,
    currentColorArrangement,
    squareBeingReplaced,
    squareBeingDragged,
    setCurrentColorArrangement,
    IncreaseMove,
    updateScore,
  } = useGameData();

  const dragStart = (value: number) => {
    console.log("setSquareBeingDragged", value);
    points = 0;
    setSquareBeingDragged(value);
  };

  const dragDrop = (value: number) => {
    console.log("setSquareBeingReplaced", value);
    setSquareBeingReplaced(value);
  };

  const dragEnd = () => {
    IncreaseMove();
    if (squareBeingReplaced === null || squareBeingDragged === null) {
      return;
    }

    const squareBeingDraggedId = squareBeingDragged;
    const squareBeingReplacedId = squareBeingReplaced;
    let dummyArray = [...currentColorArrangement];

    dummyArray[squareBeingReplacedId] =
      currentColorArrangement[squareBeingDragged];

    dummyArray[squareBeingDraggedId] =
      currentColorArrangement[squareBeingReplaced];

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - WIDTH,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + WIDTH,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    if (
      squareBeingReplacedId &&
      validMove &&
      checkIsMoveValid(dummyArray).isValidMove
    ) {
      updateScore(checkIsMoveValid(dummyArray).points);
      console.log("dummyArray", checkIsMoveValid(dummyArray).points);
      console.log(dummyArray === currentColorArrangement);
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
      setCurrentColorArrangement(dummyArray);
    }
  };

  return {
    dragStart,
    dragDrop,
    dragEnd,
  };
};

export const checkIsMoveValid = (currentColorArrangement: string[]) => {
  let isValidMove = false;
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + WIDTH, i + WIDTH * 2, i + WIDTH * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        if (points === 0) points = 4;
        isValidMove = true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        if (points === 0) points = 4;
        isValidMove = true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + WIDTH, i + WIDTH * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        if (points === 0) points = 3;
        isValidMove = true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangement[square] === decidedColor && !isBlank
        )
      ) {
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        if (points === 0) points = 3;
        isValidMove = true;
      }
    }
  };
  if (points === 0 && !isValidMove) {
    checkForColumnOfFour();
  }
  if (points === 0 && !isValidMove) {
    checkForRowOfFour();
  }
  if (points === 0 && !isValidMove) {
    checkForColumnOfThree();
  }
  if (points === 0 && !isValidMove) {
    checkForRowOfThree();
  }
  console.log({ points });

  return { isValidMove, points };
};
