var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let T = +input[0];
let testCase = input.slice(1);

function solution(T, testCase) {
  const result = [];
  for (let i = 0; i < T; i++) {
    let cnt = 0;
    for (let s of testCase[i]) {
      cnt += s === "(" ? 1 : -1;
      if (cnt < 0) break;
    }
    result.push(cnt === 0 ? "YES" : "NO");
  }

  console.log(result.join("\n"));
}
solution(T, testCase);
