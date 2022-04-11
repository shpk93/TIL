
function solution(n, k, roads) {
  let road = {};
  for (let i = 0; i < n; i++) {
    road[i] = [];
  }

  roads.forEach((el, i) => {
    let [road1, road2, time] = el;
    road[road1].push([road2, time]);
    road[road2].push([road1, time]);
  });
  // [갈보관소,시간]
  let answer = new Set();
  function dfs(nowRoad, nowTime) {
    road[nowRoad].forEach(([nextRoad, nextTime]) => {
      if (nowTime + nextTime === k) {
        answer.add(nextRoad);
      } else if (nowTime + nextTime < k) {
        dfs(nextRoad, nowTime + nextTime);
      }
    });
  }
  dfs(0, 0);

  answer = Array.from(answer).sort((a, b) => a - b);
  return answer.length ? answer : [-1];
}

// 정답 [1, 2, 3]
console.log(
  solution(6, 17, [
    [5, 4, 6],
    [5, 2, 5],
    [0, 4, 2],
    [2, 3, 3],
    [1, 2, 7],
    [0, 1, 3],
  ])
);

//[0, 1]정답 (0,1)
console.log(
  solution(4, 10, [
    [0, 1, 2],
    [0, 2, 3],
  ])
);

//정답[-1]
console.log(
  solution(4, 11, [
    [0, 1, 2],
    [1, 2, 7],
    [2, 3, 10],
    [3, 0, 9],
  ])
);
