import { useEffect, useRef } from "react";

const KaKaoMap = (props) => {
  const mapElement = useRef(null);
  useEffect(() => {
    const { kakao } = window;
    if (!mapElement.current || !kakao) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new kakao.maps.LatLng(props.lat, props.lng);
    const mapOptions: kakao.maps.MapOptions = {
      center: location,
      level: 3,
      // zoomControl: true,
      // zoomControlOptions: {
      //   position: kakao.maps.Position.TOP_RIGHT,
      // },
    };
    const map = new kakao.maps.Map(mapElement.current, mapOptions);
    new kakao.maps.Marker({
      position: location,
      map,
    });
  }, [props.lat, props.lng]);


  return (
  <div ref={mapElement} style={{ width: props.width, height: props.height }} />
  )
}

export default KaKaoMap;