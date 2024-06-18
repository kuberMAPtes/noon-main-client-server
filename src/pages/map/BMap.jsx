import { useEffect, useState } from "react";
import $ from "jquery";
import SearchWindow from "../../components/common/SearchWindow";
import FetchTypeToggle from "./component/FetchTypeToggle";
import axios_api from "../../lib/axios_api";
import { MAIN_API_URL } from "../../util/constants";
import { is2xxStatus, is4xxStatus } from "../../util/statusCodeUtil";
import { getBuildingMarkerHtml, getPlaceSearchMarkerHtml } from "./contant/markerHtml";

const naver = window.naver;

let map;

let intervalId;

let memberMarker;

let popBuildingMarkers;

let buildingSubscriptionMarkers;

export default function BMap() {
  const [placeSearchKeyword, setPlaceSearchKeyword] = useState("");
  const [currentPosition, setCurrentPosition] = useState(undefined);
  const [subscriptionChecked, setSubscriptionChecked] = useState(true);
  const [popBuildingChecked, setPopBuildingChecked] = useState(true);

  // TODO: Replace sample with real
  const sampleMember = "member_1";

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

    naver.maps.Event.addListener(map, "dragend", (e) => {
      fetchBuildingMarkers(subscriptionChecked, popBuildingChecked, sampleMember);
    });

    naver.maps.Event.addListener(map, "zoom_changed", (e) => {
      fetchBuildingMarkers(subscriptionChecked, popBuildingChecked, sampleMember);
    });
    getCurrentPosition(onCurrentPositionAwared, onFailedFetchingPosition);
    if (!intervalId) {
      intervalId = window.setInterval(() => {
        getCurrentPosition(onCurrentPositionAwared, onFailedFetchingPosition);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
      memberMarker = undefined;
      popBuildingMarkers = undefined;
      buildingSubscriptionMarkers = undefined;
    }
  }, []);

  useEffect(() => {
    fetchBuildingMarkers(popBuildingChecked, subscriptionChecked, sampleMember);
  }, [popBuildingChecked, subscriptionChecked]);

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
      <FetchTypeToggle
          subscriptionChecked={subscriptionChecked}
          setSubscriptionChecked={setSubscriptionChecked}
          popBuildingChecked={popBuildingChecked}
          setPopBuildingChecked={setPopBuildingChecked}
      />
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
  axios_api.get(`${MAIN_API_URL}/buildingProfile/getBuildingProfile`, {
    params: {
      latitude,
      longitude
    }
  }).then((response) => {
    // TODO: Do somthing later
    console.log(response);
  }).catch((err) => {
    if (is4xxStatus(err.response.status)) {
      console.log("No building profile on it");
    }
  })
}

/**
 * @param {boolean} subscriptionChecked 
 * @param {boolean} popBuildingChecked 
 * @param {string} memberId
 */
function fetchBuildingMarkers(subscriptionChecked, popBuildingChecked, memberId) {
  if (subscriptionChecked) {
    fetchSubscriptions(memberId);
  }

  if (popBuildingChecked) {
    fetchBuildingsInPositionRange();
  }
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

  return new naver.maps.Marker({
    position: new naver.maps.LatLng(latitude, longitude),
    map: map,
    icon: {
        content: contentHtml,
        size: new naver.maps.Size(width, height)
    }
  });
}

function fetchSubscriptions(memberId) {
  if (buildingSubscriptionMarkers) {
    buildingSubscriptionMarkers.forEach((b) => {
      b.setMap(null);
    });
  }
  axios_api.get(`${MAIN_API_URL}/buildingProfile/getMemberSubscriptionList`, {
    params: {
      memberId
    }
  }).then((response) => {
    const data = response.data;
    console.log(data);

    // TODO: 샘플 데이터 변경
    const sampleSubscriptionProviders = [ "sample" ];
    const sampleLiveliestChatroom = {
      "liveliness": 1,
      "chatroomName": "sample-chatroom"
    }

    const buildingMarkersCache = [];
    data.forEach((d) => {
      const contenthtml = getBuildingMarkerHtml(sampleSubscriptionProviders, sampleLiveliestChatroom, d.buildingName);
      buildingMarkersCache.push(addMarker(contenthtml, d.latitude, d.longitude));
    });
    popBuildingMarkers = buildingMarkersCache;
  });
}

function fetchBuildingsInPositionRange() {
  const positionRange = getPositionRange();
  if (popBuildingMarkers) {
    popBuildingMarkers.forEach((m) => {
      m.setMap(null);
    });
  }
  axios_api.get(`${MAIN_API_URL}/buildingProfile/getBuildingsWithinRange`, {
    params: positionRange
  }).then((response) => {
    const data = response.data;
    console.log(data);

    // TODO: 샘플 데이터 변경
    const sampleSubscriptionProviders = [ "sample" ];
    const sampleLiveliestChatroom = {
      "liveliness": 1,
      "chatroomName": "sample-chatroom"
    }

    const buildingMarkersCache = [];
    data.forEach((d) => {
      const contenthtml = getBuildingMarkerHtml(sampleSubscriptionProviders, sampleLiveliestChatroom, d.buildingName);
      buildingMarkersCache.push(addMarker(contenthtml, d.latitude, d.longitude));
    });
    popBuildingMarkers = buildingMarkersCache;
  });
}

function getPositionRange() {
  const bound = map.getBounds();

  const mapNe = bound.getNE();
  const mapSw = bound.getSW();

  return {
    lowerLatitude: mapSw.y,
    lowerLongitude: mapSw.x,
    upperLatitude: mapNe.y,
    upperLongitude: mapNe.x
  };
}