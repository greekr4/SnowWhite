import React, { useEffect } from "react";
const { kakao } = window;

export const Kakaomap = () => {
  useEffect(() => {
    // var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    // var options = {
    //   //지도를 생성할 때 필요한 기본 옵션
    //   center: new kakao.maps.LatLng(37.6372571, 126.7715038), //지도의 중심좌표.
    //   level: 7, //지도의 레벨(확대, 축소 정도)
    // };

    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.6372571, 126.7715038), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 커스텀 오버레이에 표시할 내용입니다
    // HTML 문자열 또는 Dom Element 입니다
    var content = `<div class="overlaybox">
    <div class="title">스노우화이트</div>
    <div class="find">
      <a href="https://map.kakao.com/link/to/스노우화이트,37.6372571,126.7715038" target="_blank">길찾기</a>
    </div>
    
    
    </div>`;

    // 커스텀 오버레이가 표시될 위치입니다
    var position = new kakao.maps.LatLng(37.6372571, 126.7715038);

    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
      position: position,
      content: content,
      xAnchor: 0.3,
      yAnchor: 0.91,
    });

    // 커스텀 오버레이를 지도에 표시합니다
    customOverlay.setMap(map);
  }, []);

  return (
    <div id="map" style={{ width: "820px", height: "500px" }}>
      KaKaoMap
    </div>
  );
};
