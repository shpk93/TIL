var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let K = +input[0];
let [W, H] = input[1].split(" ").map(Number);
let matrix = [];
for (let i = 2; i < H + 2; i++) {
  let row = input[i].split(" ");
  matrix.push(row);
}

function solution(W, H, matrix, K) {
  let isVisit = [];
  for (let i = 0; i < H; i++) {
    let row = [];
    for (let j = 0; j < W; j++) {
      let jumpCase = [];
      for (let k = 0; k <= K; k++) {
        jumpCase.push(false);
      }
      row.push(jumpCase);
    }
    isVisit.push(row);
  }

  // [바위깬순간, 바위안깬순간]

  let queue = [[0, 0, 0, K]];
  isVisit[0][0][K] = true;

  let dy = [0, 0, -1, 1];
  let dx = [1, -1, 0, 0];

  let dy2 = [-2, 2, -1, 1, -2, 2, -1, 1];
  let dx2 = [-1, -1, -2, -2, 1, 1, 2, 2];

  function bfs(Y, X, dist, crash) {
    for (let i = 0; i < dy.length; i++) {
      let nextY = Y + dy[i];
      let nextX = X + dx[i];
      if (!checkArea(nextY, nextX) || matrix[nextY][nextX] === "1") {
        continue;
      }

      if (!isVisit[nextY][nextX][crash]) {
        isVisit[nextY][nextX][crash] = true;
        queue.push([nextY, nextX, dist + 1, crash]);
      }
    }
    if (crash > 0) {
      for (let j = 0; j < dy2.length; j++) {
        let nextY = Y + dy2[j];
        let nextX = X + dx2[j];

        if (!checkArea(nextY, nextX) || matrix[nextY][nextX] === "1") {
          continue;
        }

        if (!isVisit[nextY][nextX][crash - 1]) {
          isVisit[nextY][nextX][crash - 1] = true;
          queue.push([nextY, nextX, dist + 1, crash - 1]);
        }
      }
    }
  }
  while (queue.length) {
    let [Y, X, dist, crash] = queue.shift();
    if (Y === H - 1 && X === W - 1) return console.log(dist);
    bfs(Y, X, dist, crash);
  }

  function checkArea(Y, X) {
    return Y >= 0 && X >= 0 && Y < H && X < W;
  }

  console.log(-1);
}

solution(W, H, matrix, K);
