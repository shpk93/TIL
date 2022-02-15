var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let N = +input[0];

let arr = input[1].split(" ").map((el) => +el);

function solution(N, arr) {
  let stack = [];
  let answer = new Array(N).fill(-1);

  for (let i = 0; i < N; i++) {
    if (stack.length) {
      while (stack.length) {
        let [value, index] = stack[stack.length - 1];
        if (value < arr[i]) {
          answer[index] = arr[i];
          stack.pop();
        } else break;
      }
    }
    stack.push([arr[i], i]);
  }
  return answer.join(" ");
}
console.log(solution(N, arr));
