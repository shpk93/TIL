var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

var input = fs.readFileSync(filepath).toString().split(" ").map(Number); // 개행문자로 입력을 구분한다.

function solution(E, S, M) {
  let count = 1;
  let e = 1;
  let s = 1;
  let m = 1;

  while (true) {
    if (e === E && s === S && m === M) {
      break;
    }
    count++;
    e++;
    s++;
    m++;
    if (e === 16) e = 1;
    if (s === 29) s = 1;
    if (m === 20) m = 1;
  }
  console.log(count);
  return count;
}

solution(...input);
