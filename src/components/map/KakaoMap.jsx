import { useEffect, useRef } from "react";

// 카카오 지도
// props : lat - 위도, lng - 경도, width - 맵 가로, height - 맵 세로 
const KaKaoMap = (props) => {
  const mapElement = useRef(null);

  // 카카오 값을 받아올 수 있는지 확인
  useEffect(() => {
    const { kakao } = window;
    if (!mapElement.current || !kakao) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new kakao.maps.LatLng(props.lat, props.lng);
    const mapOptions: kakao.maps.MapOptions = {
      // 지도 중점옵션
      center: location,
      // 확대도
      level: 3,
    };
    // 맵 옵션 적용
    const map = new kakao.maps.Map(mapElement.current, mapOptions);
    // 좌표 마커 표시
    new kakao.maps.Marker({
      position: location,
      map,
    });
  }, [props.lat, props.lng]);

  return (
    // 상속값으로 크기 조절
  <div ref={mapElement} style={{ width: props.width, height: props.height, margin:" 0 auto" }} />
  )
}

export default KaKaoMap;