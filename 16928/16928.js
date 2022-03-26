var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
input.shift();
function solution(input) {
  let isVisit = Array(101).fill(false);

  let arr = Array(101)
    .fill(null)
    .map((_, i) => i);

  let answer = Infinity;

  input.forEach((el) => {
    el = el.split(" ").map(Number);
    arr[el[0]] = el[1];
  });

  let queue = [[1, 1]];

  while (queue.length) {
    let [v, count] = queue.shift();
    bfs(v, count);
  }

  function bfs(v, count) {
    for (let i = v + 1; i <= v + 6; i++) {
      if (i > 100) return;
      let nextv = arr[i];
      if (nextv === 100) {
        answer = Math.min(count, answer);
        return;
      }
      if (!isVisit[nextv] || isVisit[nextv] > count) {
        isVisit[nextv] = count;
        queue.push([nextv, count + 1]);
      }
    }
  }

  console.log(answer);
}

solution(input);
