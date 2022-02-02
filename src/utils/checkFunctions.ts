import { useGameData } from "../context/GameDataContext";
import { CANDY_COLORS, WIDTH } from "../shared/Constant";
import blank from "../images/blank.png";

export const useCheckForPattren = () => {
  const { updateScore, currentColorArrangement, setCurrentColorArrangement } =
    useGameData();

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
        updateScore(4);
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );

        return true;
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
        updateScore(4);
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
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
        updateScore(3);
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );

        return true;
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
        updateScore(3);
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );

        return true;
      }
    }
  };

  const slideDown = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * CANDY_COLORS.length);
        currentColorArrangement[i] = CANDY_COLORS[randomNumber];
      }

      if (currentColorArrangement[i + WIDTH] === blank) {
        currentColorArrangement[i + WIDTH] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  const checkForPattren = async () => {
    checkForRowOfFour();
    checkForColumnOfFour();
    checkForRowOfThree();
    checkForColumnOfThree();
    slideDown();
    setCurrentColorArrangement([...currentColorArrangement]);
  };

  const checkIsMoveValid = () => {
    if (
      checkForRowOfFour() ||
      checkForColumnOfFour() ||
      checkForRowOfThree() ||
      checkForColumnOfThree()
    ) {
      console.log("validMove");
      return true;
    } else {
      return false;
    }
  };

  return { checkForPattren, checkIsMoveValid };
};
