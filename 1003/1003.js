var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let n = +input[0];
let arr = input.slice(1, n + 1).map(Number);

arr.forEach((el) => {
  solution(el);
});
function solution(n) {
  let dp0 = [1, 0];
  let dp1 = [0, 1];

  for (let i = 2; i <= n; i++) {
    dp0[i] = dp0[i - 1] + dp0[i - 2];
    dp1[i] = dp1[i - 1] + dp1[i - 2];
  }
  console.log(dp0[n], dp1[n]);
}
