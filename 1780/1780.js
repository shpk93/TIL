var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var [F, ...matrix] = fs
  .readFileSync(filepath)
  .toString()
  .trim()
  .split(splitStr); // 개행문자로 입력을 구분한다.

F = +F;
matrix = matrix.map((el) => el.split(" "));

function solution(F, matrix) {
  let mOneCount = 0;
  let zeroCount = 0;
  let oneCount = 0;

  let recurFn = (n, matrix, startY, startX) => {
    let boolean = true;
    let target = matrix[startY][startX];

    for (let i = startY; i < n + startY; i++) {
      for (let j = startX; j < n + startX; j++) {
        if (matrix[i][j] !== target) {
          boolean = false;
          break;
        }
      }
      if (!boolean) break;
    }

    if (boolean) {
      if (target === "-1") mOneCount += 1;
      if (target === "0") zeroCount += 1;
      if (target === "1") oneCount += 1;
    } else {
      let newN = n / 3;
      for (let i = startY; i < n + startY; i += newN) {
        for (let j = startX; j < n + startX; j += newN) {
          recurFn(newN, matrix, i, j);
        }
      }
    }
  };
  recurFn(F, matrix, 0, 0);

  console.log("" + mOneCount + "\n" + zeroCount + "\n" + oneCount);
}

solution(F, matrix);
