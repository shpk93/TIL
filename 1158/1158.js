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

  while (arr.length) {
    for (let i = 1; i <= K; i++) {
      if (i === K) {
        answerArr.push(arr.shift());
      } else {
        arr.push(arr.shift());
      }
    }
  }
  let answer = "<" + answerArr.join(", ") + ">";
  console.log(answer);
}

solution(N, K);
