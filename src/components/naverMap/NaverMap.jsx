import { useEffect, useRef } from 'react';

const NaverMap = () => {
  const mapElement = useRef(null);
  console.log(process.env.REACT_APP_NAVERMAP_API_KEY)

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);


  return (
  <div ref={mapElement} style={{ width: "300px", height: "200px" }} />
  )
}

export default NaverMap;