var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let [M, N, H] = input[0].split(" ").map(Number);

let arr = [];

for (let i = 1; i < N * H; i += N) {
  arr.push(input.slice(i, i + N).map((v) => v.split(" ").map(Number)));
}
class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);
    if (this.head == null) {
      this.head = node;
      this.head.next = null;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length += 1;
  }

  pop() {
    const popItem = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return popItem.item;
  }

  size() {
    return this.length;
  }
}

function solution(M, N, H, matrix) {
  // M은 가로/ N은 세로 H는 높이

  let distMatrix = Array(H)
    .fill(null)
    .map((el) =>
      Array(N)
        .fill(null)
        .map((el) => Array(M).fill(false))
    );

  let falseTomato = 0;
  //[높이,세로,가로]
  let queue = new Queue();
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (matrix[i][j][k] === 1) {
          queue.push([i, j, k, 0]);
          distMatrix[i][j][k] = 0;
        }
        if (matrix[i][j][k] === 0) {
          falseTomato++;
        }
        if (matrix[i][j][k] === -1) {
          distMatrix[i][j][k] = -1;
        }
      }
    }
  }
  if (falseTomato === 0) {
    console.log(0);
    return;
  }

  let dx = [0, 0, 1, -1, 0, 0];
  let dy = [-1, 1, 0, 0, 0, 0];
  let dh = [0, 0, 0, 0, 1, -1];

  while (queue.size()) {
    bfs(...queue.pop());
  }

  let answer = -1;
  count();

  console.log(answer);
  function bfs(h, Y, X, dist) {
    for (let i = 0; i < dx.length; i++) {
      let nx = X + dx[i];
      let ny = Y + dy[i];
      let nh = h + dh[i];

      if (nx < 0 || ny < 0 || nh < 0 || nx >= M || ny >= N || nh >= H) {
        continue;
      }
      if (distMatrix[nh][ny][nx] === false && matrix[nh][ny][nx] === 0) {
        distMatrix[nh][ny][nx] = dist + 1;
        queue.push([nh, ny, nx, dist + 1]);
      }
    }
  }

  function count() {
    for (let i = 0; i < H; i++) {
      for (let j = 0; j < N; j++) {
        for (let k = 0; k < M; k++) {
          if (distMatrix[i][j][k] === false) {
            answer = -1;
            return;
          } else {
            answer = Math.max(answer, distMatrix[i][j][k]);
          }
        }
      }
    }
  }
}
solution(M, N, H, arr);
