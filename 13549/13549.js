var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(" ");

let N = +input[0];
let K = +input[1];
// class Node {
//   constructor(item) {
//     this.item = item;
//     this.next = null;
//   }
// }

// class Queue {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//     this.length = 0;
//   }

//   push(item) {
//     const node = new Node(item);
//     if (this.head == null) {
//       this.head = node;
//       this.head.next = null;
//     } else {
//       this.tail.next = node;
//     }

//     this.tail = node;
//     this.length += 1;
//   }

//   pop() {
//     const popItem = this.head;
//     this.head = this.head.next;
//     this.length -= 1;
//     return popItem.item;
//   }

//   size() {
//     return this.length;
//   }
// }
function solution(N, K) {
  let isVisit = new Array(100005).fill(false);

  //   let queue = new Queue();

  let queue = [];
  let head = 0;
  let enqueue = (item) => {
    queue.push(item);
  };
  let dequeue = () => {
    let item;
    if (head < queue.length) {
      item = queue[head];
      head++;
    }
    return item;
  };
  enqueue([N, 0]);
  isVisit[N] = 0;

  let dx = [-1, 1, 2];

  function bfs(now, time) {
    for (let i = 0; i < dx.length; i++) {
      let next = now + dx[i];
      let nextTime = time + 1;
      if (i === 2) {
        next = now * 2;
        nextTime = time;
      }

      if (next < 0 || next > 100005) continue;
      if (next === K) {
        if (isVisit[next] === false) isVisit[next] = nextTime;
        else isVisit[next] = Math.min(nextTime, isVisit[next]);
      } else if (isVisit[next] === false || isVisit[next] > nextTime) {
        isVisit[next] = nextTime;
        enqueue([next, nextTime]);
      }
    }
  }

  while (head !== queue.length) {
    let [pos, time] = dequeue();
    bfs(pos, time);
  }
  bfs(N, 0);
  console.log(isVisit[K]);
}
solution(N, K);
