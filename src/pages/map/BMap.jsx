import { useEffect, useState } from "react";
import $ from "jquery";
import SearchBar, { PARAM_KEY_SEARCH_KEYWORD } from "../../components/common/SearchBar";
import FetchTypeToggle from "./component/FetchTypeToggle";
import axios_api from "../../lib/axios_api";
import { MAIN_API_URL } from "../../util/constants";
import { is2xxStatus, is4xxStatus } from "../../util/statusCodeUtil";
import { getBuildingMarkerHtml, getLiveliestChatroomMarkerHtml, getPlaceSearchMarkerHtml, getSubscriptionMarkerHtml } from "./contant/markerHtml";
import mapStyles from "../../assets/css/module/map/BMap.module.css";
import "../../assets/css/module/map/BMap.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMapState } from "../../redux/slices/currentMapStateSlice";
import WantBuildingProfile from "../building/components/WantBuildingProfile";
import MarkerModeButtonGroup, { MARKER_MODES } from "./component/MarkerModeButtonGroup";
import { Spinner } from "reactstrap";
import { MdCancel } from "react-icons/md";

const naver = window.naver;

let map;

let intervalId;

let memberMarker;

let popBuildingMarkers = new Map();

let buildingSubscriptionMarkers = new Map();

let placeSearchMarkers;

const buildingFetchChecked = {
  subscriptionChecked: true,
  currentMarkerDisplayMode: MARKER_MODES.DISPLAY_BUILDING_NAME
}

export default function BMap() {
  const {ownerIdOfMapInfo} = useParams();
  const isSubscriptionView = ownerIdOfMapInfo !== undefined;

  const [queryParams, setQueryParams] = useSearchParams();

  const [placeSearchKeyword, setPlaceSearchKeyword] =
      useState(queryParams.has(PARAM_KEY_SEARCH_KEYWORD) ? queryParams.get(PARAM_KEY_SEARCH_KEYWORD) : "");
  const [currentPosition, setCurrentPosition] = useState(undefined);
  const [subscriptionChecked, setSubscriptionChecked] = useState(true);
  const [firstEntry, setFirstEntry] = useState(true);
  const [wantBuildingProfileModal, setWantBuildingProfileModal] = useState({
    isOpen: false,
    onClose: () => {},
    applicationData: {
      buildingName: "",
      roadAddr: "",
      longitude: 0.0,
      latitude: 0.0
    }
  });
  const [currentMarkerDisplayMode, setCurrentMarkerDisplayMode] = useState(ownerIdOfMapInfo === undefined ? MARKER_MODES.DISPLAY_BUILDING_NAME : MARKER_MODES.DISPLAY_NONE);

  const [loading, setLoading] = useState(false);
  const [placesSearchResultExists, setPlacesSearchResultExists] = useState(false);

  const currentMapState = useSelector((state) => state.currentMapState.value);

  const dispatch = useDispatch();

  buildingFetchChecked.subscriptionChecked = subscriptionChecked;
  buildingFetchChecked.currentMarkerDisplayMode = currentMarkerDisplayMode;

  const navigate = useNavigate();

  const loginMember = useSelector((state) => state.auth.member);

  const member = ownerIdOfMapInfo ? ownerIdOfMapInfo : loginMember.memberId;

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

  function initMap(map) {
    naver.maps.Event.addListener(map, "click", (e) => {
      const latitude = e.latlng.y;
      const longitude = e.latlng.x;
      fetchBuildingInfo(latitude, longitude, setWantBuildingProfileModal, navigate);
    });

    naver.maps.Event.addListener(map, "dragend", (e) => {
      fetchBuildingMarkers(buildingFetchChecked.subscriptionChecked, member, navigate, buildingFetchChecked.currentMarkerDisplayMode, setWantBuildingProfileModal);
      const center = map.getCenter();
      dispatch(setCurrentMapState({
        latitude: center.y,
        longitude: center.x
      }));
    });

    naver.maps.Event.addListener(map, "zoom_changed", (e) => {
      fetchBuildingMarkers(buildingFetchChecked.subscriptionChecked, member, navigate, buildingFetchChecked.currentMarkerDisplayMode, setWantBuildingProfileModal);
      console.log(e);
      dispatch(setCurrentMapState({
        zoomLevel: e
      }));
    });
  }

  useEffect(() => {
    const mapElement = document.getElementById("map");
    getCurrentPosition((coords) => {
      const initialMapState = {
        latitude: currentMapState.initialized ? currentMapState.latitude : coords.latitude,
        longitude: currentMapState.initialized ? currentMapState.longitude : coords.longitude,
        zoomLevel: currentMapState.zoomLevel,
        initialized: true
      }
      setCurrentPosition({
        latitude: coords.latitude,
        longitude: coords.longitude
      });
      map = new naver.maps.Map(mapElement, {
        center: new naver.maps.LatLng(initialMapState.latitude, initialMapState.longitude),
        zoom: initialMapState.zoomLevel
      });
      dispatch(setCurrentMapState(initialMapState));
      
      initMap(map);
      setFirstEntry(false);
    }, () => {
      console.error("Geolocation API not supported");
      const initialMapState = {
        latitude: currentMapState.latitude,
        longitude: currentMapState.longitude,
        zoomLevel: currentMapState.zoomLevel,
        initialized: true
      }
      map = new naver.maps.Map(mapElement, {
        center: new naver.maps.LatLng(initialMapState.latitude, initialMapState.longitude),
        zoom: initialMapState.zoomLevel
      });
      dispatch(setCurrentMapState(initialMapState));
      initMap(map);
      setFirstEntry(false);
    });
    
    if (!intervalId) {
      intervalId = window.setInterval(() => {
        getCurrentPosition(onCurrentPositionAwared, onFailedFetchingPosition);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
      if (memberMarker) {
        memberMarker.setMap(null);
      }
      memberMarker = undefined;
      clearMarkers(popBuildingMarkers);
      popBuildingMarkers = new Map();
      clearMarkers(buildingSubscriptionMarkers);
      buildingSubscriptionMarkers = new Map();
    }
  }, []);

  useEffect(() => {
    if (!firstEntry) {
      fetchBuildingMarkers(subscriptionChecked, member, navigate, currentMarkerDisplayMode, setWantBuildingProfileModal)
          .then((result) => {})
          .catch((err) => console.error(err));
    }
  }, [subscriptionChecked, firstEntry]);

  useEffect(() => {
    if (!firstEntry) {
      clearMarkers(popBuildingMarkers);
      fetchBuildingMarkers(subscriptionChecked, member, navigate, currentMarkerDisplayMode)
          .then((result) => {})
          .catch((err) => console.error(err));
    }
  }, [currentMarkerDisplayMode]);

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
    <div className={mapStyles.mapContainer}>
      <div id="map">
        {loading && (
          <div className={mapStyles.loadingSpinnerContainer}>
            <Spinner className={mapStyles.loadingSpinner} color="primary" />
          </div>
        )}
        <MarkerModeButtonGroup
            currentMarkerDisplayMode={currentMarkerDisplayMode}
            setCurrentMarkerDisplayMode={setCurrentMarkerDisplayMode}
        />
        {placesSearchResultExists && (
          <MdCancel className={mapStyles.removePlaceSearchResultsButton} onClick={() => {
            if (placeSearchMarkers) {
              for (let marker of placeSearchMarkers) {
                marker.setMap(null);
              }
              placeSearchMarkers = undefined;
              setPlacesSearchResultExists(false);
              setPlaceSearchKeyword("");
              queryParams.delete("search-keyword");
              setQueryParams(queryParams);
            }
          }} />
        )}
        <SearchBar
            typeCallback={(text) => setPlaceSearchKeyword(text)}
            searchCallback={() => searchPlaceList(placeSearchKeyword, onSearchPlace, queryParams, setQueryParams, setLoading, setPlacesSearchResultExists)}
          />
        <button
            type="button"
            className={mapStyles.myLocationButton}
            onClick={() => currentPosition && map && map.setCenter(new naver.maps.LatLng(currentPosition.latitude, currentPosition.longitude))}>
          <img src="/image/my-location.png" alt="my-location" /> 
        </button>
        <FetchTypeToggle
            subscriptionChecked={subscriptionChecked}
            setSubscriptionChecked={setSubscriptionChecked}
        />
      </div>
      <WantBuildingProfile
          isOpen={wantBuildingProfileModal.isOpen}
          onClose={wantBuildingProfileModal.onClose}
          applicationData={wantBuildingProfileModal.applicationData}
      />
    </div>
  )
}

/**
 * 
 * @param {string} searchKeyword 
 * @param {(places: any) => void} callback 
 */
function searchPlaceList(searchKeyword, callback, queryParams, setQueryParams, setLoading, setPlacesSearchResultExists) {
  setLoading(true);
  queryParams.set(PARAM_KEY_SEARCH_KEYWORD, searchKeyword);
  setQueryParams(queryParams);
  axios_api.get(`${MAIN_API_URL}/places/search`, {
    params: {
      placeName: searchKeyword
    }
  }).then((response) => {
    if (is2xxStatus(response.status)) {
      callback(response.data)
      setPlacesSearchResultExists(true);
    }
    setLoading(false);
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
function onSearchPlace(places) {
  console.log(places);
  if (placeSearchMarkers) {
    for (let marker of placeSearchMarkers) {
      marker.setMap(null);
    }
  }
  const placeSearchMarkersCache = [];
  places.forEach((place) => {
    const contentHtml = getPlaceSearchMarkerHtml(place.roadAddress, place.placeName);
    const placeSearchMarker = addMarker(contentHtml, place.latitude, place.longitude, false);
    placeSearchMarkersCache.push(placeSearchMarker);
  });
  placeSearchMarkers = placeSearchMarkersCache;
  if (places?.length > 0) {
    map.setCenter(new naver.maps.LatLng(places[0].latitude, places[0].longitude))
  }
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
function fetchBuildingInfo(latitude, longitude, setWantBuildingProfileModal, navigate) {
  axios_api.get(`${MAIN_API_URL}/buildingProfile/getBuildingProfile`, {
    params: {
      latitude,
      longitude
    }
  }).then((response) => {
    console.log(response);
    navigate(`/getBuildingProfile/${response.data.buildingId}`);
  }).catch((err) => {
    if (is4xxStatus(err.response.status)) {
      const data = err.response.data;
      console.log(data);
      if (data.buildingExisting) {
        setWantBuildingProfileModal({
          isOpen: true,
          onClose: () => setWantBuildingProfileModal({
            isOpen: false,
            onClose: () => {},
            applicationData: {
              buildingName: "",
              roadAddr: "",
              longitude: 0,
              latitude: 0
            }
          }),
          applicationData: {
            buildingName: data.place.placeName,
            roadAddr: data.place.roadAddress,
            longitude: data.place.longitude,
            latitude: data.place.latitude
          }
        });
      }
    }
  })
}

/**
 * @param {boolean} subscriptionChecked 
 * @param {string} memberId
 */
async function fetchBuildingMarkers(subscriptionChecked, memberId, navigate, currentMarkerDisplayMode, setWantBuildingProfileModal) {
  switch (currentMarkerDisplayMode) {
    case MARKER_MODES.DISPLAY_BUILDING_NAME:
      await fetchBuildingsInPositionRange(navigate);
      break;
    case MARKER_MODES.DISPLAY_LIVELIEST_CHATROOM:
      await fetchChatroomMarkers(navigate);
      break;
    default:
      clearMarkers(popBuildingMarkers);
  }

  if (subscriptionChecked) {
    await fetchSubscriptions(memberId, navigate, setWantBuildingProfileModal);
  } else {
    clearMarkers(buildingSubscriptionMarkers);
  }
}

/**
 * @param {string} html 
 * @param {number} latitude 
 * @param {number} longitude 
 */
function addMarker(html, latitude, longitude, clickable = true) {
  $(document).children().append($(html).addClass("temp"));
  const width = $(".temp").width();
  const height = $(".temp").height();
  $(".temp").attr("width", width).attr("height", height);
  const contentHtml = $(".temp").html();
  $(document).find(".temp").remove();

  return new naver.maps.Marker({
    position: new naver.maps.LatLng(latitude, longitude),
    map: map,
    clickable: clickable,
    icon: {
        content: contentHtml,
        size: new naver.maps.Size(width, height)
    }
  });
}

async function fetchBuildingsInPositionRange(navigate, currentMarkerDisplayMode) {
  const positionRange = getPositionRange();
  console.log(positionRange);
  const response = await axios_api.get(`${MAIN_API_URL}/buildingProfile/getBuildingsWithinRange`, {
    params: positionRange
  });
  const data = response.data;
  console.log(data);

  const buildingMarkersCache = new Set();
  
  data.forEach((d) => {
    const buildingId = d.buildingId;
    buildingMarkersCache.add(buildingId);
    if (popBuildingMarkers.has(buildingId)) {
      return;
    }

    const contenthtml = getBuildingMarkerHtml(d.buildingName);
    const buildingMarker = addMarker(contenthtml, d.latitude, d.longitude)
    naver.maps.Event.addListener(buildingMarker, "click", () => {
      navigate(`/getBuildingProfile/${d.buildingId}`);
    });
    popBuildingMarkers.set(buildingId, buildingMarker);
  });
  clearMarkers(popBuildingMarkers, buildingMarkersCache);
}

async function fetchSubscriptions(memberId, navigate, setWantBuildingProfileModal) {
  console.log(memberId);
  const response = await axios_api.get(`${MAIN_API_URL}/buildingProfile/getMemberSubscriptionList`, {
    params: {
      memberId
    }
  })
  const data = response.data;
  console.log(data);

  const buildingMarkersCache = new Set();
  data.forEach((d) => {
    const buildingId = d.building.buildingId;
    if (!popBuildingMarkers.has(buildingId)) {
      buildingMarkersCache.add(buildingId);
      if (buildingSubscriptionMarkers.has(buildingId)) {
        return;
      }
      const contentHtml = getSubscriptionMarkerHtml(d.subscriptionProvider.nickname, d.building.buildingName);
      const buildingMarker = addMarker(contentHtml, d.building.latitude, d.building.longitude);
      naver.maps.Event.addListener(buildingMarker, "click", () => {
        if (d.building.profileActivated) {
          navigate(`/getBuildingProfile/${buildingId}`);
        } else {
          setWantBuildingProfileModal({
            isOpen: true,
            onClose: () => setWantBuildingProfileModal({
              isOpen: false,
              onClose: () => {},
              applicationData: {
                buildingName: "",
                roadAddr: "",
                longitude: 0,
                latitude: 0
              }
            }),
            applicationData: {
              buildingName: d.building.buildingName,
              roadAddr: d.building.roadAddr,
              longitude: d.building.longitude,
              latitude: d.building.latitude
            }
          });
        }
      });
      buildingSubscriptionMarkers.set(buildingId, buildingMarker);
    }
  });
  clearMarkers(buildingSubscriptionMarkers, buildingMarkersCache);
}

function fetchChatroomMarkers(navigate) {
  axios_api.get("/buildingProfile/liveliestChatrooms")
      .then((response) => {
        const data = response.data;
        const chatroomMarkerCache = new Set();
        console.log(data);
        data.forEach((d) => {
          const chatroomId = d.chatroomId;
          chatroomMarkerCache.add(chatroomId);
          const contentHtml = getLiveliestChatroomMarkerHtml(d.chatroomName, d.liveliness);
          const chatroomMarker = addMarker(contentHtml, d.building.latitude, d.building.longitude);
          naver.maps.Event.addListener(chatroomMarker, "click", () => {
            navigate(`/chat/chatroom?chatroomID=${chatroomId}`);
          });
          popBuildingMarkers.set(chatroomId, chatroomMarker);
        });
        clearMarkers(popBuildingMarkers, chatroomMarkerCache);
      })
      .catch((err) => {
        console.error(err);
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

/**
 * 
 * @param {Map} markers 
 * @param {Set<number>} toRemain 
 */
function clearMarkers(markers, toRemain) {
  for (let marker of markers) {
    const [buildingId, markerInstance] =  marker;
    if (!toRemain || !toRemain.has(buildingId)) {
      markerInstance.setMap(null);
      markers.delete(buildingId);
    }
  }
}
