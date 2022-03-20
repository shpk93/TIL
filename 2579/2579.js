var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";

var input = fs.readFileSync(filepath).toString().split(splitStr).map(Number); // 개행문자로 입력을 구분한다.

const N = input[0];
const arr = input.slice(1, N + 1);

function solution(arr) {
  //[점프할 수 있는수, 무조건점프해야하는수]
  let dp = [
    [arr[0], 0],
    [arr[1], arr[0] + arr[1]],
  ];

  if (arr.length < 2) {
    console.log(arr[0]);
    return;
  }
  for (let i = 2; i < arr.length; i++) {
    let now = arr[i];
    let one = Math.max(dp[i - 2][1], dp[i - 2][0]) + now;
    let two = dp[i - 1][0] + now;

    dp[i] = [one, two];
  }

  console.log(Math.max(...dp[dp.length - 1]));
}
solution(arr);
