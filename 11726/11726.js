var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = +fs.readFileSync(filepath).toString();

function solution(n) {
  let dp = [0, 1, 2, 3];

  if (n <= 3) {
    console.log(dp[n]);
    return;
  }
  for (let i = 4; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
  }
  console.log(dp[n]);
}

solution(input);
