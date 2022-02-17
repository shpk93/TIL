// 자연수 N개가 중복없이 들어있는 배열이 있습니다. 이때, 서로 다른 두 원소의 위치를 바꾸는 Swap 연산을 이용해 원소들의 위치를 바꿔 서로 인접한 원소의 차가 K 이하가 되도록 하려 합니다.
// 단, Swap 연산을 최대한 적게 사용해야 합니다

// 배열 numbers가 매개변수로 주어질 때, 서로 인접한 원소의 차가 K 이하가 되도록 하는데 필요한 Swap 횟수의 최솟값을 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// numbers의 길이는 1 이상 8 이하입니다.
// numbers의 원소는 1 이상 100 이하인 자연수입니다.
// 숫자는 중복없이 들어있습니다.
// K는 1 이상 100 이하인 자연수입니다.
// 서로 인접한 원소의 차가 K 이하가 되도록 할 수 있는 방법이 없다면 -1을 return 하세요.
// 입출력 예
// numbers                       k           result
// [10, 40, 30, 20]            20           1
// [3, 7, 2, 8, 6, 4, 5, 1]    3             2
// 입출력 예 설명
// 입출력 예 1
// 30과 40의 위치를 바꾸면 [10, 30, 40, 20]이 되며, 인접한 원소의 차가 모두 20 이하가 됩니다.

// 입출력 예 2
// 3과 4의 위치를 바꾸고, 2와 5의 위치를 바꾸면 [4, 7, 5, 8, 6, 3, 2, 1]이 되며, 인접한 원소의 차가 모두 3 이하가 됩니다.

///////// 나의풀이
// 순열을해야할듯
// 순열을 만들고 각 인접한 요소의 차이가 k이하인지 확인.
// 새로운 배열로 푸시
// 정답만 모아놓은 새로운 배열에서 어떻게 스왑해야 하는지 체크

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
