import { useEffect } from "react"

const naver = window.naver;

export default function BMap() {

  useEffect(() => {
    const mapElement = document.getElementById("map");
    const map = new naver.maps.Map(mapElement);
  }, []);
  
  return (
    <>
      <div id="map" style={{width: "400px", height: "400px"}}></div>
    </>
  )
}
