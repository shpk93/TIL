var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

function solution(M, N) {
  let arr = [];

  for (let i = M; i <= N; i++) {
    let sqrt = Math.sqrt(i);
    let boolean = true;
    if (i === 1) continue;
    for (let j = 2; j <= sqrt; j++) {
      if (i % j === 0) {
        boolean = false;
        break;
      }
    }
    if (boolean) arr.push(i);
  }
  if (arr.length === 0) {
    console.log(-1);
    return;
  }

  let result = [arr.reduce((a, b) => a + b), arr[0]];
  result.forEach((el) => {
    console.log(el);
  });
}

solution(+input[0], +input[1]);
