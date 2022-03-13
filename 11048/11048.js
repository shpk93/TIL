var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filepath).toString().split(splitStr);

// console.log(input);
let [N, M] = input[0].split(" ").map(Number);

let matrix = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));

function solution(N, M, matrix) {
  let dp = Array(N)
    .fill(null)
    .map((el) => Array(M).fill(0));

  let dx = [0, 1];
  let dy = [1, 0];
  dp[0][0] = matrix[0][0];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      let now = matrix[y][x];
      let lastY = y - 1;
      let lastX = x - 1;
      let lastChoice = 0;
      if (lastY >= 0 && lastY < N) {
        lastChoice = Math.max(lastChoice, dp[lastY][x]);
      }
      if (lastX >= 0 && lastX < M) {
        lastChoice = Math.max(lastChoice, dp[y][lastX]);
      }
      dp[y][x] = lastChoice + now;
    }
  }
  console.log(dp[N - 1][M - 1]);
}

solution(N, M, matrix);
