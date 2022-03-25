var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let T = +input[0];
let count = 0;
let index = 1;
while (count !== T) {
  count++;
  let [N, M, K] = input[index].split(" ").map(Number);

  let testCase = input
    .slice(index + 1, index + K + 1)
    .map((el) => el.split(" ").map(Number));
  index = index + K + 1;

  solution(N, M, K, testCase);
}

function solution(N, M, K, testCase) {
  let bfs = (y, x) => {
    let dx = [0, 0, 1, -1];
    let dy = [1, -1, 0, 0];

    for (let i = 0; i < dx.length; i++) {
      let nextY = y + dy[i];
      let nextX = x + dx[i];

      if (nextX < 0 || nextX >= N || nextY < 0 || nextY >= M) continue;
      if (!isVisit[nextY][nextX] && matrix[nextY][nextX] === 1) {
        isVisit[nextY][nextX] = true;
        queue.push([nextY, nextX]);
      }
    }
  };
  let matrix = Array(M)
    .fill(null)
    .map((el) => Array(N).fill(0));

  let isVisit = Array(M)
    .fill(null)
    .map((el) => Array(N).fill(false));

  testCase.forEach(([x, y]) => {
    matrix[y][x] = 1;
  });
  let count = 0;

  let queue = [];

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (matrix[i][j] === 1 && !isVisit[i][j]) {
        count++;
        queue.push([i, j]);
        while (queue.length) {
          bfs(...queue.shift());
        }
      }
    }
  }

  console.log(count);
}
