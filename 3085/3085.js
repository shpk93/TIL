var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let N = +input[0];
let matrix = input.slice(1, N + 1).map((el) => el.split(""));

function solution(N, matrix) {
  // 빨간색은 C, 파란색은 P, 초록색은 Z, 노란색은 Y

  let answer = 0;
  for (let i = 0; i < N; i++) {
    answer = Math.max(answer, check(i, 0, matrix));
    for (let j = 0; j < N; j++) {
      let now = matrix[i][j];
      if (j !== N - 1) {
        let next = matrix[i][j + 1];
        if (now !== next) {
          [matrix[i][j], matrix[i][j + 1]] = [matrix[i][j + 1], matrix[i][j]];
          let count = check(i, j, matrix);
          let count2 = check(i, j + 1, matrix);
          answer = Math.max(count, answer, count2);
          [matrix[i][j], matrix[i][j + 1]] = [matrix[i][j + 1], matrix[i][j]];
        }
      }
      if (i !== N - 1) {
        let next = matrix[i + 1][j];
        if (now !== next) {
          [matrix[i + 1][j], matrix[i][j]] = [matrix[i][j], matrix[i + 1][j]];
          let count = check(i, j, matrix);
          let count2 = check(i + 1, j, matrix);
          answer = Math.max(count, answer, count2);
          [matrix[i + 1][j], matrix[i][j]] = [matrix[i][j], matrix[i + 1][j]];
        }
      }
    }
  }
  console.log(answer);

  function check(y, x, matrix) {
    let max = 0;
    let now = 1;

    for (let i = 0; i < N - 1; i++) {
      let target = matrix[i][x];
      let target2 = matrix[i + 1][x];
      if (target === target2) {
        now++;
        max = Math.max(now, max);
      } else {
        now = 1;
      }
    }
    now = 1;
    for (let i = 0; i < N - 1; i++) {
      let target = matrix[y][i];
      let target2 = matrix[y][i + 1];
      if (target === target2) {
        now++;
        max = Math.max(now, max);
      } else {
        now = 1;
      }
    }
    return max;
  }
}

solution(N, matrix);
