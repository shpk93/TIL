var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let [N, M] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number).slice(0, N);

function solution(M, arr) {
  arr.sort((a, b) => a - b);
  function getPermutation(arr, selectNum) {
    if (selectNum === 1) return arr.map((el) => [el]);

    let result = [];

    arr.forEach((el, i) => {
      let rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      let permutation = getPermutation(rest, selectNum - 1);
      let attached = permutation.map((permu) => [el, ...permu]);
      result.push(...attached);
    });

    return result;
  }
  let permutation = getPermutation(arr, M);

  let answer = "";
  permutation.forEach((el) => {
    answer += el.join(" ") + "\n";
  });

  console.log(answer);
}
solution(M, arr);
