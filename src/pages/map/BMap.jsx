import { useEffect, useState } from "react";
import $ from "jquery";
import SearchWindow from "../../components/common/SearchWindow";
import FetchTypeToggle from "./component/FetchTypeToggle";
import axios_api from "../../lib/axios_api";
import { MAIN_API_URL } from "../../util/constants";
import { is2xxStatus } from "../../util/statusCodeUtil";
import { getPlaceSearchMarkerHtml } from "./contant/markerHtml";

const naver = window.naver;

let map;

let intervalId;

let memberMarker;

export default function BMap() {
  const [placeSearchKeyword, setPlaceSearchKeyword] = useState("");
  const [currentPosition, setCurrentPosition] = useState(undefined);

  /**
   * 
   * @param {GeolocationCoordinates} coords 
   */
  function onCurrentPositionAwared(coords) {
    setCurrentPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  }

  function onFailedFetchingPosition() {
    console.error("Geolocation API not supported");
  }

  useEffect(() => {
    const mapElement = document.getElementById("map");
    map = new naver.maps.Map(mapElement);
    fetchBuildingMarkers(); // TODO: 구독건물보기하고 인기건물보기 중 뭐가 디폴트였더라?

    naver.maps.Event.addListener(map, "click", (e) => {
      const latitude = e.latlng.y;
      const longitude = e.latlng.x;
      fetchBuildingInfo(latitude, longitude);
    });

    getCurrentPosition(onCurrentPositionAwared, onFailedFetchingPosition);
    if (!intervalId) {
      intervalId = window.setInterval(() => {
        getCurrentPosition(onCurrentPositionAwared, onFailedFetchingPosition);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    if (currentPosition) { 
      if (!memberMarker) {
        memberMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude),
          map: map
        })
      } else {
        memberMarker.setPosition(new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude));
      }
    }
  }, [currentPosition]);
  
  return (
    <>
      <SearchWindow
        typeCallback={(text) => setPlaceSearchKeyword(text)}
        searchCallback={() => searchPlaceList(placeSearchKeyword, onFetchPlace)}
      />
      <FetchTypeToggle />
      <div id="map" style={{width: "400px", height: "400px", cursor: "none"}}></div>
      <button type="button" onClick={() => currentPosition && map && map.setCenter(new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude))}>
        현재 위치 보기
      </button>
    </>
  )
}

/**
 * 
 * @param {string} searchKeyword 
 * @param {(places: any) => void} callback 
 */
function searchPlaceList(searchKeyword, callback) {
  axios_api.get(`${MAIN_API_URL}/places/search`, {
    params: {
      placeName: searchKeyword
    }
  }).then((response) => {
    if (is2xxStatus(response.status)) {
      callback(response.data)
    }
  })
}

/**
 * @param {{
 *   placeName: string;
 *   roadAddress: string;
 *   latitude: number;
 *   longitude: number;
 * }[]} places 
 */
function onFetchPlace(places) {
  places.forEach((place) => {
    const contentHtml = getPlaceSearchMarkerHtml(place.roadAddress, place.placeName);
    addMarker(contentHtml, place.latitude, place.longitude);
  })
}

/**
 * @param {(position: GeolocationCoordinates) => void} callback 
 * @param {() => void} errorCallback 
 */
function getCurrentPosition(callback, errorCallback) {
  navigator.geolocation.getCurrentPosition( // Geolocation은 HTTPS일 때 구동한다.
    (position) => {
      callback(position.coords);
    },
    () => {
      errorCallback();
    }
  );
}

/**
 * @param {number} latitude 
 * @param {number} longitude 
 */
function fetchBuildingInfo(latitude, longitude) {
  axios_api.get(`${MAIN_API_URL}/places/search`, {
    params: {
      latitude,
      longitude
    }
  }).then((response) => {
    console.log(response);
  }).catch((err) => {
    console.error(err);
  })
}

/**
 * @param {"SUB" | "POPULAR"} type 
 */
function fetchBuildingMarkers(type) {
  // TODO: API 요청
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

  const a = new naver.maps.Marker({
    position: new naver.maps.LatLng(latitude, longitude),
    map: map,
    icon: {
        content: contentHtml,
        size: new naver.maps.Size(width, height)
    }
  });
  console.log(a);
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