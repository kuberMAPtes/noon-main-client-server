import { useEffect } from "react"

const naver = window.naver;

let map;

export default function BMap() {

  useEffect(() => {
    const mapElement = document.getElementById("map");
    map = new naver.maps.Map(mapElement);
  }, []);
  
  return (
    <>
      <div id="map" style={{width: "400px", height: "400px"}}></div>
    </>
  )
}

const Liveliness = {

}

/**
 * @param {{
 *   latitude: number;
 *   longitude: number;
 *   buildingName: string;
 *   livelistChatroom: {
 *     liveliness: Liveliness;
 *     chatroomName: string;
 *   };
 *   subscriptionProviders: string[];
 * }} content
 */
function addMarker(content) {
  const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(content.latitude, content.longitude),
    map: map
  });
  
  const infoWindow = new naver.maps.InfoWindow({
    content,
    borderWidth: 0,
    disableAnchor: true,
    backgroundColor: "transparent"
  });
  infoWindow.open(map, marker);
}