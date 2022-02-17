var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

input = input.map((el) => +el);

function solution(arr) {
  let answer = [];
  arr = arr.slice(0, 9); // 인풋오류떄문에 9개로 자름.
  let getCombination = (arr, selectNum) => {
    if (selectNum === 1) {
      return arr.map((el) => [el]);
    }
    let result = [];
    arr.forEach((el, i) => {
      let rest = arr.slice(i + 1);
      let combination = getCombination(rest, selectNum - 1);
      let attach = combination.map((combi) => [el, ...combi]);
      result.push(...attach);
    });

    return result;
  };
  let combination = getCombination(arr, 7);

  for (let i = 0; i < combination.length; i++) {
    let sum = combination[i].reduce((a, b) => a + b);
    if (sum === 100) {
      answer = combination[i];
      break;
    }
  }
  answer.sort((a, b) => a - b);
  answer.forEach((el) => {
    console.log(el);
  });
}

solution(input);
