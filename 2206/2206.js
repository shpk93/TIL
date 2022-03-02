var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let [N, M] = input[0].split(" ").map((el) => +el);

let map = input.slice(1, N + 1).map((el) => el.split(""));
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

  empty() {
    if (this.length == 0) {
      return 1;
    } else {
      return 0;
    }
  }

  front() {
    if (this.empty() == 1) return -1;
    return this.head.item;
  }

  back() {
    if (this.empty() == 1) return -1;
    return this.tail.item;
  }
}
function solution(N, M, map) {
  let isVisit = [];

  for (let i = 0; i < N; ++i) {
    isVisit[i] = [];
    for (let j = 0; j < M; ++j) {
      isVisit[i][j] = [];
      isVisit[i][j][0] = isVisit[i][j][1] = -1;
    }
  }

  let queue = new Queue();
  queue.push([0, 0, 1, 1]);
  isVisit[0][0][0] = 1;
  isVisit[0][0][1] = 1;
  let dy = [-1, 0, 1, 0];
  let dx = [0, 1, 0, -1];

  const bfs = (Y, X, dist, crash) => {
    for (let i = 0; i < dy.length; i++) {
      let nextY = Y + dy[i];
      let nextX = X + dx[i];

      if (nextY >= 0 && nextY < N && nextX >= 0 && nextX < M) {
        if (map[nextY][nextX] === "1" && crash === 1) {
          isVisit[nextY][nextX][crash - 1] = dist + 1;
          queue.push([nextY, nextX, dist + 1, crash - 1]);
        }
        if (map[nextY][nextX] === "0" && isVisit[nextY][nextX][crash] == -1) {
          isVisit[nextY][nextX][crash] = dist + 1;
          queue.push([nextY, nextX, dist + 1, crash]);
        }
      }
    }
  };
  let answer = -1;
  while (queue.size()) {
    let [Y, X, dist, crash] = queue.pop();
    if (Y === N - 1 && X === M - 1) {
      answer = dist;
      if (answer === 0) answer = -1;
      break;
    }
    bfs(Y, X, dist, crash);
  }

  console.log(answer);
}
solution(N, M, map);
