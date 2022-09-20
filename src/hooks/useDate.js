// 날짜를 계산하는 커스텀 훅
const useDate = (today, lastday, date) => {
  let dates = [];

  dates[0] = today;
  for (let i = 1; i < date; i++) {
    today++;
    //마지막 날보다 날짜가 클경우 today를 1로 초기화.
    if (today > lastday) {
      today = 1;
      dates[i] = today;
    }
    //일반 경우 그냥 날짜 추가
    else {
      dates[i] = today;
    }
  }

  //요일 정상적으로 뜨는지 확인해보자
  //console.log(dates[1].getDay());

  return dates;
};

export default useDate;