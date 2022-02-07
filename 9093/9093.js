var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let T = input[0];
let tastCase = input.slice(1);

function solution(T, tastCase) {
  let result = [];

  tastCase.forEach((el) => {
    let item = "";
    let a = el.split(" ");
    a.forEach((el2) => {
      let b = el2.split("").reverse().join("");
      if (item.length === 0) {
        item = b;
      } else {
        item = item + " " + b;
      }
    });
    result.push(item);
  });

  result.forEach((el) => {
    console.log(el);
  });
}
solution(T, tastCase);
