export const Nonograms = {
  easy1: [
    [true, true, false, true, true],
    [true, false, false, true, true],
    [false, false, false, false, true],
    [false, true, true, false, false],
    [false, true, true, true, false]
  ],

  easy2: [
    [true, false, false, false, false],
    [true, true, false, false, false],
    [false, true, true, true, true],
    [true, true, true, true, false],
    [true, true, false, false, false]
  ],

  easy3: [
    [true, true, true, false, false],
    [true, true, false, false, false],
    [true, true, false, false, false],
    [false, false, false, true, true],
    [true, true, false, true, true]
  ],

  easy4: [
    [true, true, false, false, false],
    [true, true, false, false, false],
    [false, false, false, true, true],
    [true, true, false, true, true],
    [true, true, true, false, false]
  ],

  easy5: [
    [true, false, false, false, false],
    [true, true, true, false, false],
    [false, false, false, false, true],
    [true, false, true, true, true],
    [true, false, true, true, true]
  ],

  easy6: [
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, true, true, true, false],
    [true, true, true, false, true],
    [true, true, true, false, true]
  ],
}

export function generateSVG(arr) {
  const pre = `<svg
  viewBox="0 0 40 40"
  version="1.1"
  id="svg1"
  xmlns="http://www.w3.org/2000/svg">`;
  let result = pre;
  const post = '\n</svg>';
  for (let row = 0; row < arr.length; row += 1) {
    for (let column = 0; column < arr.length; column += 1) {
      if (arr[row][column]) {
        result += `
    <rect
      id="rect-${row}-${column}"
      width="8"
      height="8"
      x="${column * 8}"
      y="${row * 8}" />`
      }
    }
  }
  result += post;
  return result;
}