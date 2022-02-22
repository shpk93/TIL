var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString();

function solution(num) {
  answer = "";
  let count = 0;
  function move(a, b, n) {
    if (n === 1) {
      answer += `${a} ${b}` + "\n";
      count++;
      return;
    }
    let target = 6 - a - b;
    move(a, target, n - 1);
    move(a, b, 1);
    move(target, b, n - 1);
  }
  move(1, 3, num);
  answer = count + "\n" + answer;

  return answer;
}
console.log(solution(+input));
