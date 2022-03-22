var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";

var input = fs.readFileSync(filepath).toString().split(splitStr).map(Number); // 개행문자로 입력을 구분한다.

const N = input[0];
const testCase = input.slice(1, N + 1);

testCase.forEach((el) => {
  solution(el);
});
function solution(N) {
  let dp = [0, 1, 2, 4];

  for (let i = 4; i < N + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }

  console.log(dp[N]);
}
