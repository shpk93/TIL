var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let N = +input[0];

let houses = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));

function solution(houses) {
  let dp = [];

  houses.forEach(([red, blue, green], i) => {
    if (i === 0) dp[0] = { red, blue, green };
    else {
      red = Math.min(dp[i - 1]["blue"], dp[i - 1]["green"]) + red;
      blue = Math.min(dp[i - 1]["red"], dp[i - 1]["green"]) + blue;
      green = Math.min(dp[i - 1]["red"], dp[i - 1]["blue"]) + green;
      dp[i] = { red, blue, green };
    }
  });
  console.log(Math.min(...Object.values(dp[dp.length - 1])));
}

solution(houses);
