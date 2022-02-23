var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr); // 개행문자로 입력을 구분한다.

let [N, S] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);

function solution(N, S, arr) {
  let count = 0;

  let fn = (startN, now) => {
    if (startN === N) {
      if (now === S) count++;
      return;
    }
    fn(startN + 1, now);
    fn(startN + 1, now + arr[startN]);
  };
  if (S === 0) count--;
  fn(0, 0);
  console.log(count);
}

solution(N, S, arr);
