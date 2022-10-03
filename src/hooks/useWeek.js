// 요일을 계산하는 커스텀 훅
// 파라미터 todayWeek = 요일, date = 날짜 개수
const useWeek = (todayWeek, date) => {
  // let strWeak = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let strWeek = ["일", "월", "화", "수", "목", "금", "토"];
  let weeklist = [];

  //첫번째 오늘 날짜 적용

  weeklist[0] = strWeek[todayWeek];

  for (let i = 1; i < date; i++) {
    todayWeek++;
    if (todayWeek > 6) {
      todayWeek = 0;
      weeklist[i] = strWeek[todayWeek];
    } else {
      weeklist[i] = strWeek[todayWeek];
    }
  }

  return weeklist;
};

export default useWeek