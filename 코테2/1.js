// 인풋으로 A , B 가 주어진다.
// A는 "SUN","MON","WEN","WED","THU","FRI","SAT" 중 하나가 들어오며
// 각각 요일을 나타낸다 .
// B는 1~10000000 까지의 자연수가 들어온다.

// 오늘이 A요일일때 B일 후의 요일을 A형식의 문자로 리턴해라.

// ex. 오늘이 목요일이고 23일뒤의 요일은 토요일이므로
// "SAT"을 리턴한다.

//
// B가 아무리 늘어나도 연산횟수는 똑같으므로 시간복잡도 O(1)
function solution(A, B) {
  let dayArr = ["SUN", "MON", "WEN", "WED", "THU", "FRI", "SAT"];

  let dayIndex = dayArr.indexOf(A);
  return dayArr[(dayIndex + B) % 7];
}

console.log(solution("THU", 23)); // "SAT"
