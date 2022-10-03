import { useEffect, useRef } from 'react';

// 네이버 지도
const NaverMap = (props) => {
  const mapElement = useRef(null);

  // 네이버 값을 받아올 수 있는지 확인
  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(props.lat, props.lng);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      // 확대 단계
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    // 맵 옵션 적용
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    // 좌표 마커 표시
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [props.lat, props.lng]);

  return (
  <div ref={mapElement} style={{ width: "500px", height: "400px" }} />
  )
}

export default NaverMap;