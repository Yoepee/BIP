// 요일을 계산하는 커스텀 훅
const useWeak = (todayWeak) => {
  // let strWeak = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let strWeak = ["일", "월", "화", "수", "목", "금", "토"];
  let weaklist = [];

  //첫번째 오늘 날짜 적용

  weaklist[0] = strWeak[todayWeak];

  for (let i = 1; i <= 6; i++) {
    todayWeak++;
    if (todayWeak > 6) {
      todayWeak = 0;
      weaklist[i] = strWeak[todayWeak];
    } else {
      weaklist[i] = strWeak[todayWeak];
    }
  }

  return weaklist;
};

export default useWeak