var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
var N = +fs.readFileSync(filepath).toString();

function solution(N) {
  let isUsed2 = new Array(N).fill(0); // y값이 같음  세로
  let isUsed3 = new Array(N + N).fill(0); // x+y값이 같음 왼대각
  let isUsed4 = new Array(N + N).fill(0);
  let count = 0;

  function travel(y) {
    if (y === N) return count++;

    for (let x = 0; x < N; x++) {
      if (isUsed2[x] || isUsed3[x + y] || isUsed4[y - x + N]) {
        continue;
      }
      isUsed2[x] = isUsed3[x + y] = isUsed4[y - x + N] = 1;
      travel(y + 1);
      isUsed2[x] = isUsed3[x + y] = isUsed4[y - x + N] = 0;
    }
  }
  travel(0);
  console.log(count);
}

solution(N);
