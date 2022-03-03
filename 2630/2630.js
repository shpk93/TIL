var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let N = +input[0];
let matrix = input.slice(1, N + 1).map((el) => el.split(" "));

function solution(N, matrix) {
  let white = 0;
  let black = 0;

  let checkFn = (num, Y, X) => {
    let target = matrix[Y][X];
    for (let y = Y; y < Y + num; y++) {
      for (let x = X; x < X + num; x++) {
        if (matrix[y][x] !== target) {
          return false;
        }
      }
    }
    return target;
  };

  let divide = (num, Y, X) => {
    let check = checkFn(num, Y, X);
    if (check === "0") return white++;
    if (check === "1") return black++;

    let half = num / 2;
    divide(half, Y, X);
    divide(half, Y + half, X);
    divide(half, Y, X + half);
    divide(half, Y + half, X + half);
  };

  divide(N, 0, 0);
  console.log(white + "\n" + black);
}

solution(N, matrix);
