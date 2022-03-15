var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filepath).toString().split(splitStr);

let [N, M] = input[0].split(" ").map(Number);

let arr = input[1].split(" ").map(Number);

let sliceNum = input.slice(2, M + 2).map((el) => el.split(" ").map(Number));

function solution(M, M, arr, sliceNum) {
  let prefix = [0];
  let answer = "";

  arr.forEach((el, i) => {
    prefix.push(el + prefix[i]);
  });
  sliceNum.forEach((el, i) => {
    let [start, end] = el;
    answer += prefix[end] - prefix[start - 1] + "\n";
  });
  console.log(answer);
}

solution(M, M, arr, sliceNum);
