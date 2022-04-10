function solution(s) {
  let tempArr = [
    "Time",
    "0:",
    "Go",
    "straight",
    "100m",
    "and",
    "turn",
    "right",
  ];
  let stack = [];
  let answer = [];
  let time = 0;
  for (let i = 0; i < s.length; i++) {
    if (stack.length === 0) {
      stack.push(s[i]);
      continue;
    }

    let top = stack[stack.length - 1];
    if (top === s[i]) {
      stack.push(s[i]);
    } else {
      let copyTemp = tempArr.slice();

      copyTemp[1] = time + ":";
      copyTemp[4] = stack.length + "00m";
      if (stack.length > 5) {
        copyTemp[4] = "500m";
        copyTemp[1] = time + stack.length - 5 + ":";
      }

      if (top === "S") {
        if (s[i] === "E") {
          copyTemp[7] = "left";
        }
      }
      if (top === "N") {
        if (s[i] === "W") {
          copyTemp[7] = "left";
        }
      }
      if (top === "W") {
        if (s[i] === "S") {
          copyTemp[7] = "left";
        }
      }
      if (top === "E") {
        if (s[i] === "N") {
          copyTemp[7] = "left";
        }
      }
      time = i;
      stack = [s[i]];
      answer.push(copyTemp.join(" "));
    }
  }
  console.log(answer);
}

solution("EEESEEEEEENNNN");
solution("SSSSSSWWWNNNNNN");
