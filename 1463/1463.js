var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

var input = +fs.readFileSync(filepath).toString(); // 개행문자로 입력을 구분한다.

function solution(x) {
  let dp = [Infinity, 0];

  for (let i = 2; i < x + 1; i++) {
    let num1 = dp[i - 1];
    let num2 = Infinity;
    let num3 = Infinity;

    if (i % 2 === 0) {
      num2 = dp[i / 2];
    }
    if (i % 3 === 0) {
      num3 = dp[i / 3];
    }
    dp[i] = Math.min(num1, num2, num3) + 1;
  }

  console.log(dp[x]);
}
solution(input);
