
function solution(numbers, k) {
  let permutation = getPermutations(numbers, numbers.length);
  let answerArr = [];

  permutation.forEach((el) => {
    let boolean = true;
    for (let i = 0; i < el.length - 1; i++) {
      if (Math.abs(el[i] - el[i + 1]) > k) {
        boolean = false;
        break;
      }
    }
    if (boolean) answerArr.push(el);
  });
  if (answerArr.length === 0) return -1;

  let min = Infinity;
  answerArr.forEach((arr) => {
    let copyOrigins = numbers.slice();
    let count = getSwapCount(arr, copyOrigins);
    min = Math.min(min, count);
  });
  return min;
}

function getPermutations(arr, selectNumber) {
  if (selectNumber === 1) return arr.map((el) => [el]);
  let result = [];
  arr.forEach((el, i) => {
    let rest = arr.slice(0, i).concat(arr.slice(i + 1));
    let permutation = getPermutations(rest, selectNumber - 1);
    let attached = permutation.map((combi) => [el, ...combi]);
    result.push(...attached);
  });
  return result;
}

function getSwapCount(arr, origin) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === origin[i]) continue;
    let swapIndex = origin.indexOf(arr[i]);
    [origin[i], origin[swapIndex]] = [origin[swapIndex], origin[i]];
    count++;
  }
  return count;
}

console.log(solution([10, 40, 30, 20], 20));
console.log(solution([3, 7, 2, 8, 6, 4, 5, 1], 3));
