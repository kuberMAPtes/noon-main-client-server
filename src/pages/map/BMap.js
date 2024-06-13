import { useEffect, useState } from "react";
import $ from "jquery";
import SearchWindow from "../../components/common/SearchWindow";
import FetchTypeToggle from "./component/FetchTypeToggle";

const naver = window.naver;

let map;

let intervalId;

export default function BMap() {
  const [placeSearchKeyword, setPlaceSearchKeyword] = useState("");

  useEffect(() => {
    const mapElement = document.getElementById("map");
    map = new naver.maps.Map(mapElement);
    fetchBuildingMarkers(); // TODO: 구독건물보기하고 인기건물보기 중 뭐가 디폴트였더라?

    naver.maps.Event.addListener(map, "click", (e) => {
      const latitude = e.latlng.y;
      const longitude = e.latlng.x;
      fetchBuildingInfo(latitude, longitude);
    });

    getCurrentPosition();
    if (!intervalId) {
      intervalId = window.setInterval(() => {
        console.log()
        getCurrentPosition();
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  function onFetchPlace() {

  }
  
  return (
    <>
      <SearchWindow
        typeCallback={(text) => setPlaceSearchKeyword(text)}
        searchCallback={() => searchPlaceList(placeSearchKeyword, onFetchPlace)}
      />
      <FetchTypeToggle />
      <div id="map" style={{width: "400px", height: "400px", cursor: "none"}}></div>
    </>
  )
}

/**
 * 
 * @param {string} searchKeyword 
 * @param {() => void} callback 
 */
function searchPlaceList(searchKeyword, callback) {
  // TODO: API 요청
  console.log(searchKeyword);
}

/**
 * @param {(position: GeolocationPosition) => void} callback 
 * @param {() => void} errorCallback 
 */
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition( // Geolocation은 HTTPS일 때 구동한다.
    (position) => {
      // TODO: 회원 마커 찍기
      console.log(position);
    },
    () => {
      // 에러 핸들링
      console.log("Geolocation API를 사용할 수 없습니다.");
    }
  );
}

/**
 * @param {number} latitude 
 * @param {number} longitude 
 */
function fetchBuildingInfo(latitude, longitude) {
  // TODO: API 요청
  console.log(`latitude=${latitude}`);
  console.log(`longitude=${longitude}`);
}

/**
 * @param {"SUB" | "POPULAR"} type 
 */
function fetchBuildingMarkers(type) {
  // TODO: API 요청
}

const liveliness = {
  1: "#e03131",
  2: "#f08c00",
  3: "#ffd43b",
  4: "#37b24d",
  5: "#adb5bd",
  6: "#212529"
}

/**
 * @param {{
 *   latitude: number;
 *   longitude: number;
 *   buildingName: string;
 *   livelistChatroom: {
 *     liveliness: number;
 *     chatroomName: string;
 *   };
 *   subscriptionProviders: string[];
 * }} marker
 */
function addBuildingMarker(marker) {
  const contentHtmlText = `
  <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; height: fit-content; margin: 0px; padding: 0px">
    <div style="text-align: center;">
      <p>${marker.subscriptionProviders[0]}</p>
      <p>${marker.livelistChatroom.chatroomName}</p>
      <p>${marker.buildingName}</p>
    </div>
    <div style="display: flex; justify-content: center; align-items: center; ">
      <img src="./image/marker.png" style="width: 40px; height: 50px; margin: 0px; padding: 0px" />
    </div>
  </div>
  `

  addMarker(contentHtmlText);
}

/**
 * @param {string} html 
 * @param {number} latitude 
 * @param {number} longitude 
 */
function addMarker(html, latitude, longitude) {
  $(document).children().append($(html).addClass("temp"));
  const width = $(".temp").width();
  const height = $(".temp").height();
  $(".temp").attr("width", width).attr("height", height);
  const contentHtml = $(".temp").html();
  $(document).find(".temp").remove();

  new naver.maps.Marker({
    position: new naver.maps.LatLng(latitude, longitude),
    map: map,
    icon: {
        content: contentHtml,
        size: new naver.maps.Size(width, height)
    }
  });
}

function getPositionRange() {
  const bound = map.getBounds();

  const mapNe = bound.getNE();
  const mapSw = bound.getSW();

  return {
    ne: {
      latitude: mapNe.y,
      longitude: mapNe.x,
    },
    nw: {
      latitude: mapNe.y,
      longitude: mapSw.x
    },
    se: {
      latitude: mapSw.y,
      longitude: mapNe.x
    },
    sw: {
      latitude: mapSw.y,
      longitude: mapSw.x
    }
  };
}