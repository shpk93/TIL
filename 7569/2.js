var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let [M, N, H] = input[0].split(" ").map(Number);

let matrix = [];

for (let i = 1; i < N * H + 1; i = i + N) {
  matrix.push(input.slice(i, i + N).map((el) => el.split(" ").map(Number)));
}

function solution(M, N, H, matrix) {
  // M은 가로//N은 세로//H는 높이
  let isVisit = Array.from({ length: H }, () =>
    Array.from({ length: N }, () => Array.from({ length: M }, () => false))
  );

  let queue = [];
  let queueIndex = 0;
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (matrix[i][j][k] === -1) {
          isVisit[i][j][k] = 0;
        }
        if (matrix[i][j][k] === 1) {
          isVisit[i][j][k] = 0;
          queue.push([i, j, k, 0]);
        }
      }
    }
  }

  while (queue.length !== queueIndex) {
    bfs(...queue[queueIndex]);
    queueIndex++;
  }
  function bfs(h, y, x, dist) {
    let dx = [0, 0, 1, -1, 0, 0];
    let dy = [1, -1, 0, 0, 0, 0];
    let dh = [0, 0, 0, 0, 1, -1];

    for (let i = 0; i < dx.length; i++) {
      let nh = h + dh[i];
      let ny = y + dy[i];
      let nx = x + dx[i];

      if (nh < 0 || ny < 0 || nx < 0 || nh >= H || ny >= N || nx >= M) continue;

      if (matrix[nh][ny][nx] === 0 && isVisit[nh][ny][nx] === false) {
        isVisit[nh][ny][nx] = dist + 1;
        queue.push([nh, ny, nx, dist + 1]);
      }
    }
  }
  let answer = 0;
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (isVisit[i][j][k] === false) {
          answer = -1;
          return -1;
        }
        answer = Math.max(answer, isVisit[i][j][k]);
      }
    }
  }
  return answer;
}

console.log(solution(M, N, H, matrix));
