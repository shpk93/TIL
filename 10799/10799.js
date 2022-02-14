var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
var input = fs.readFileSync(filepath).toString();

function solution(input) {
  let res = 0;
  let now = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      if (input[i + 1] === ")") {
        //레이저일때
        res += now;
        i++;
      } else {
        now++;
      }
    } else if (input[i] === ")") {
      res++;
      now--;
    }
  }
  console.log(res);
}
solution(input);
