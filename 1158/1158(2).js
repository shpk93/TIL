var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().split(" ");

let N = +input[0];
let K = +input[1];

function solution(N, K) {
  let arr = [];

  for (let i = 1; i <= N; i++) {
    arr.push(i);
  }

  let answerArr = [];
  let targetNum = K - 1;
  while (arr.length) {
    for (let i = 0; i < arr.length; i++) {
      if (targetNum === 0) {
        answerArr.push(arr[i]);
        arr.splice(i, 1);
        targetNum = K - 1;
        i--;
      } else {
        targetNum--;
      }
    }
  }

  let answer = "<" + answerArr.join(", ") + ">";
  return answer;
}

console.log(solution(N, K));
