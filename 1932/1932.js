var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let N = +input[0];

let triangle = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));

function solution(triangle) {
  triangle.reverse();

  let dp = triangle[0].slice(0);
  for (let i = 1; i < triangle.length; i++) {
    let newDp = [];
    triangle[i].forEach((el, j) => {
      newDp.push(Math.max(dp[j], dp[j + 1]) + triangle[i][j]);
    });
    dp = newDp;
  }
  console.log(dp[0]);
}
solution(triangle);
