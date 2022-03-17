var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let [N, M, V] = input[0].split(" ").map(Number);
let arr = input.slice(1, M + 1).map((el) => el.split(" ").map(Number));

function solution(N, M, V, arr) {
  let matrix = {};
  for (let i = 1; i <= N; i++) {
    matrix[i] = [];
  }

  arr.forEach((el, i) => {
    matrix[el[0]].push(el[1]);
    matrix[el[1]].push(el[0]);
  });
  for (let i = 1; i <= N; i++) {
    matrix[i].sort((a, b) => a - b);
  }

  let isVisit = Array(V).fill(false);
  let dfsAnswer = "";
  let bfsAnswer = "";

  dfs(V);
  isVisit.fill(false);
  let queue = [V];
  bfsAnswer += V + " ";
  isVisit[V] = true;

  while (queue.length) {
    bfs(queue.shift());
  }

  function bfs(v) {
    matrix[v].forEach((el) => {
      if (!isVisit[el]) {
        isVisit[el] = true;
        bfsAnswer += el + " ";
        queue.push(el);
      }
    });
  }
  function dfs(v) {
    isVisit[v] = true;
    dfsAnswer += v + " ";
    matrix[v].forEach((el) => {
      if (!isVisit[el]) {
        dfs(el);
      }
    });
  }
  console.log(dfsAnswer);
  console.log(bfsAnswer);
}

solution(N, M, V, arr);
