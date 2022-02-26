var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
var [N, M] = fs
  .readFileSync(filepath)
  .toString()
  .split(" ")
  .map((el) => +el);

function solution(N, M) {
  let arr = [];

  for (let i = 1; i <= N; i++) {
    arr.push(i);
  }
  function getPermutation(arr, selectNum) {
    if (selectNum === 1) {
      return arr.map((el) => [el]);
    }
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
    el = el.join(" ");
    answer += el + "\n";
  });
  console.log(answer);
}

solution(N, M);
