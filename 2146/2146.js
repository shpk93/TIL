var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let N = +input[0];
let matrix = [];
let minDis = Infinity;

let island = 2;
for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

function solution(N, matrix) {
  let isVisit = [];
  for (let i = 0; i < N; i++) {
    let row = [];
    for (let j = 0; j < N; j++) {
      row.push([0, false]);
    }
    isVisit.push(row);
  }

  let dy = [0, 1, 0, -1];
  let dx = [1, 0, -1, 0];

  let queue = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (matrix[i][j] === 1) {
        matrix[i][j] = island;
        dfs1(i, j);
        island++;
      }
    }
  }
  function dfs1(Y, X) {
    for (let i = 0; i < 2; i++) {
      nextY = Y + dy[i];
      nextX = X + dx[i];

      if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= N) continue;
      if (matrix[nextY][nextX] === 1) {
        matrix[nextY][nextX] = island;
        dfs1(nextY, nextX);
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (matrix[i][j] > 1) {
        for (let k = 0; k < 4; k++) {
          nextY = i + dy[k];
          nextX = j + dx[k];

          if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= N) continue;
          if (matrix[nextY][nextX] === 0 && !isVisit[nextY][nextX][1]) {
            isVisit[nextY][nextX][1] = matrix[i][j];
            isVisit[nextY][nextX][0] = 1;
            queue.push([nextY, nextX, 1, matrix[i][j]]);
          }
        }
      }
    }
  }

  function bfs(Y, X, dist, island) {
    for (let k = 0; k < 4; k++) {
      nextY = Y + dy[k];
      nextX = X + dx[k];

      if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= N) continue;
      if (matrix[nextY][nextX] === 0) {
        if (isVisit[nextY][nextX][1] === false) {
          isVisit[nextY][nextX][1] = island;
          isVisit[nextY][nextX][0] = dist + 1;
          queue.push([nextY, nextX, dist + 1, island]);
        } else if (isVisit[nextY][nextX][1] === island) {
          isVisit[nextY][nextX][0] = Math.min(
            isVisit[nextY][nextX][0],
            dist + 1
          );
        } else if (isVisit[nextY][nextX][1] !== island) {
          minDis = Math.min(minDis, dist + isVisit[nextY][nextX][0]);
        }
      }
      if (matrix[nextY][nextX] > 2 && matrix[nextY][nextX] !== island) {
        minDis = Math.min(minDis, dist);
      }
    }
  }

  while (queue.length) {
    let [Y, X, dist, island] = queue.shift();
    bfs(Y, X, dist, island);
  }

  console.log(minDis);
  return minDis;
}

solution(N, matrix);
