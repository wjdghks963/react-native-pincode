export default function shuffleArray(array: string[][]) {
  function shuffle(flatArray: string[]) {
    for (let i = flatArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // @ts-ignore
      [flatArray[i], flatArray[j]] = [flatArray[j], flatArray[i]];
    }
  }

  const flattenedArr = array.flat();

  shuffle(flattenedArr);

  const shuffledNumpadArr = [];

  while (flattenedArr.length) {
    shuffledNumpadArr.push(flattenedArr.splice(0, array[0]!.length));
  }

  return shuffledNumpadArr;
}
