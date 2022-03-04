var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";

var input = fs.readFileSync(filepath).toString().split(splitStr);

let N = input[0];

let testCase = input.slice(1, N * 2 + 1);

console.log(testCase);

function solution(n, list) {
  let matrix = {};
  let matrix2 = {};
  let isVisit = new Array(n + 1).fill(false);

  list.forEach((el, i) => {
    matrix[i + 1] = el;
  });
  let answer = [];
  let answer3 = [];
  console.log(matrix);
  for (let i = 1; i <= n; i++) {
    if (isVisit[i]) continue;
    bfs(`${i}`, matrix[i], [`${i}`], []);
  }
  console.log(answer);
  console.log(answer3);
  function bfs(me, now, arr, isVisit) {
    if (!isVisit[now]) return;
    if (now === me) {
      answer.push(...arr);
    } else {
      let next = matrix[now];
      if (!isVisit[next]) {
        isVisit[next] = true;
        arr.push(next);
        bfs(me, next, arr, isVisit);
      } else {
        answer3.push(...arr);
      }
    }
  }
}

for (let i = 0; i < testCase.length; i += 2) {
  let n = testCase[i];
  let list = testCase[i + 1].split(" ");
  solution(n, list);
}
