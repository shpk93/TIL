var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";

var input = fs.readFileSync(filepath).toString().split(splitStr);

let N = +input[0];
let matrix = input.slice(1, N + 1);

function solution(N, matrix) {
  let isVisit = Array(N)
    .fill(null)
    .map((el) => Array(N).fill(false));

  let queue = [];
  let count = 0;
  let answer = "";
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!isVisit[i][j]) {
        queue.push([i, j, 0]);
        count++;
        isVisit[i][j] = true;
        while (queue.length) {
          bfs(...queue.shift());
        }
      }
    }
  }
  answer += count + " ";
  count = 0;
  isVisit = Array(N)
    .fill(null)
    .map((el) => Array(N).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!isVisit[i][j]) {
        queue.push([i, j, 1]);
        count++;
        isVisit[i][j] = true;
        while (queue.length) {
          bfs(...queue.shift());
        }
      }
    }
  }
  answer += count;
  console.log(answer);

  function bfs(Y, X, option) {
    let dy = [0, 0, 1, -1];
    let dx = [1, -1, 0, 0];
    let color = matrix[Y][X];

    for (let i = 0; i < dy.length; i++) {
      let nextY = Y + dy[i];
      let nextX = X + dx[i];
      if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= N) continue;
      let nextColor = matrix[nextY][nextX];

      if (!isVisit[nextY][nextX] && nextColor === color && !option) {
        isVisit[nextY][nextX] = true;
        queue.push([nextY, nextX, 0]);
      } else if (option && !isVisit[nextY][nextX]) {
        if (color === "G") color = "R";
        if (nextColor === "G") nextColor = "R";
        if (nextColor === color) {
          isVisit[nextY][nextX] = true;
          queue.push([nextY, nextX, 1]);
        }
      }
    }
  }
}
solution(N, matrix);
