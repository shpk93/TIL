var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let N = +input[0];
let arr = input[1].split(" ").map((el) => +el);

function solution(N, arr) {
  let countBox = {};
  let answerArr = new Array(N).fill(-1);
  let stack = [];

  for (let i = 0; i < N; i++) {
    countBox[arr[i]] ? countBox[arr[i]]++ : (countBox[arr[i]] = 1);
  }

  for (let i = 0; i < N; i++) {
    while (stack.length) {
      let now = countBox[arr[i]];
      let top = stack[stack.length - 1];
      if (now > countBox[top[0]]) {
        answerArr[top[1]] = arr[i];
        stack.pop();
      } else break;
    }
    stack.push([arr[i], i]);
  }

  console.log(answerArr.join(" "));
}
solution(N, arr);
