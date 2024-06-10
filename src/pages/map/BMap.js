import { useEffect } from "react";
import $ from "jquery";

const naver = window.naver;

let map;

export default function BMap() {

  useEffect(() => {
    const mapElement = document.getElementById("map");
    map = new naver.maps.Map(mapElement);
    fetchBuildingMarkers(); // TODO: 구독건물보기하고 인기건물보기 중 뭐가 디폴트였더라?
  }, []);
  
  return (
    <>
      <div id="map" style={{width: "400px", height: "400px", cursor: "none"}}></div>
    </>
  )
}

/**
 * @param {"SUB" | "POPULAR"} type 
 */
function fetchBuildingMarkers(type) {
  // TODO
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

  $(document).children().append($(contentHtmlText).addClass("temp"));
  const width = $(".temp").width();
  const height = $(".temp").height();
  $(".temp").attr("width", width).attr("height", height);
  const contentHtml = $(".temp").html();
  $(document).find(".temp").remove();

  new naver.maps.Marker({
    position: new naver.maps.LatLng(marker.latitude, marker.longitude),
    map: map,
    icon: {
        content: contentHtml,
        size: new naver.maps.Size(width, height)

    }
  });
}