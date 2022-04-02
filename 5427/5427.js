var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

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
let N = +input[0];
let testCase = [];
let count = 0;
let answerBox = [];
for (let i = 1; count < N; i++) {
  count++;
  let [r, c] = input[i].split(" ").map(Number);

  let matrix = input.slice(i + 1, i + 1 + c).map((el) => el.split(""));
  testCase.push([r, c, matrix]);
  i = i + c;
}
testCase.forEach((el) => {
  solution(...el);
});
console.log(answerBox.join("\n"));

function solution(r, c, matrix) {
  let queue = new Queue();
  let answer = "IMPOSSIBLE";

  start();
  start2();

  if (answer !== "IMPOSSIBLE") {
    answerBox.push(answer);
    return;
  }
  while (queue.size()) {
    bfs(...queue.pop());
  }
  answerBox.push(answer);
  return;
  function bfs(y, x, target, dist) {
    let dx = [0, 0, -1, 1];
    let dy = [1, -1, 0, 0];

    for (let i = 0; i < dx.length; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || ny < 0 || ny >= c || nx >= r) {
        if (target === "@") {
          answer = dist + 1;
          queue = new Queue();
          return;
        } else continue;
      }
      if (matrix[ny][nx] === "#") continue;
      if (target === "@") {
        if (matrix[ny][nx] === ".") {
          matrix[ny][nx] = dist + 1;
          queue.push([ny, nx, "@", dist + 1]);
        }
      }
      if (target === "*") {
        if (matrix[ny][nx] !== "*") {
          matrix[ny][nx] = "*";
          queue.push([ny, nx, "*", dist + 1]);
        }
      }
    }
  }

  function start() {
    for (let i = 0; i < c; i++) {
      for (let j = 0; j < r; j++) {
        if (matrix[i][j] === "*") {
          queue.push([i, j, "*", 0]);
        }
      }
    }
  }
  function start2() {
    for (let i = 0; i < c; i++) {
      for (let j = 0; j < r; j++) {
        if (matrix[i][j] === "@") {
          if (i === 0 || i === c - 1 || j === 0 || r === r - 1) {
            answer = 1;
            return;
          }
          matrix[i][j] = 0;
          queue.push([i, j, "@", 0]);
        }
      }
    }
  }
}
