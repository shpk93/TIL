var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let testCases = input.slice(0, -1).map((el) => {
  return el.split(" ").map((el) => +el);
});

let answers = "";
testCases.forEach((el) => {
  let answer = solution(el[0], el.slice(1, el[0] + 1));
  answer.forEach((el) => {
    answers += el.join(" ") + "\n";
  });
  answers += "\n";
});

console.log(answers);

function solution(K, S) {
  let answerArr = [];

  function getCombination(arr, selectNum) {
    if (selectNum === 1) return arr.map((el) => [el]);
    let result = [];
    arr.forEach((el, i) => {
      let rest = arr.slice(i + 1);
      let combination = getCombination(rest, selectNum - 1);
      let attach = combination.map((combi) => [el, ...combi]);
      result.push(...attach);
    });
    return result;
  }

  let combintion = getCombination(S, 6);
  return combintion;
}
