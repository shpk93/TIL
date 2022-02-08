var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let n = +input[0];
let nums = input.slice(1, n + 1).map((el) => +el);

let stack = [];
let i = 1;
let answer = "";
let answerArr = [];

for (let k = 0; k < nums.length; k++) {
  let target = nums[k];

  for (i; i <= n; i++) {
    if (target === i) {
      answerArr.push(i);
      answer += "+\n-\n";
      i++;
      break;
    }
    if (target > i) {
      stack.push(i);
      answer += "+\n";
    }
    if (target < i) {
      while (stack.length) {
        let top = stack.pop();
        answer += "-\n";
        if (top === target) {
          answerArr.push(top);
          break;
        }
      }
      break;
    }
  }
}
let boolean = true;
if (stack.length) {
  let rest = nums.slice(-stack.length);
  stack = stack.reverse();
  for (let i = 0; i < stack.length; i++) {
    if (rest[i] === stack[i]) {
      answer += "-\n";
      continue;
    } else {
      boolean = false;
      break;
    }
  }
}
if (boolean && answerArr.length + stack.length === n) {
  console.log(answer);
} else {
  console.log("NO");
}
