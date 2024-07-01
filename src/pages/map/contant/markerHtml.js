import { MARKER_MODES } from "../component/MarkerModeButtonGroup";

/**
 * @param {string} subscriptionProviderList 
 * @param {{
 *   liveliness: number;
 *   chatroomName: string;
 * }} liveliestChatroom 
 * @param {string} buildingName 
 * @param {string} markerImage
 */
export function getBuildingMarkerHtml(
    buildingName
) {
  return getCommonHtml(``, `<img src="/image/popular-bulilding.png" style="width: 20px; height: 30px; margin: 0px; padding: 0px" />`);
}

export function getSubscriptionMarkerHtml(subscriptionProvider, buildingName, activated) {
  const content = ``;
  return getCommonHtml(content,
      activated
          ? `<img src="/image/subscription-bulilding.png" style="width: 20px; height: 30px; margin: 0px; padding: 0px" />`
          : `<img src="/image/not-activated-building.png" style="width: 20px; height: 30px; margin: 0px; padding: 0px" />`);
}

const LIVELINESS_COLOR = {
  5: "#fa5252",
  4: "#f783ac",
  3: "#fcc419",
  2: "#37b24d",
  1: "#495057"
}

export function getLiveliestChatroomMarkerHtml(chatroomName, liveliness) {
  const content = ``;
  return getCommonHtml(content, `<svg style="color: ${LIVELINESS_COLOR[liveliness]};" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="24" width="24" xmlns="http:;//www.w3.org/2000/svg"><path d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>`);
}

/**
 * @param {string} roadAddress 
 * @param {string} placeName 
 * @param {string} markerImage
 */
export function getPlaceSearchMarkerHtml(
    roadAddress,
    placeName,
    markerImage = "/image/marker.png"
) {
  const content = `
    <div style="width: fit-content">${placeName}</div>
    <div style="width: fit-content">${roadAddress}</div>
  `;
  return getCommonHtml(content, `<img src="${markerImage}" style="width: 20px; height: 30px; margin: 0px; padding: 0px" />`);
}

/**
 * @param {string} content 
 * @param {string} markerImage 
 */
function getCommonHtml(content, imageElem, additionalImageWrapperStyle = "") {
  return `
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; height: fit-content; margin: 0px; padding: 0px">
      <div style="text-align: center; overflow: hidden; white-space: nowrap; display: flex; flex-direction: column; justify-content: center; align-items: center">
        ${content}
      </div>
      <div style="display: flex; justify-content: center; align-items: center; ${additionalImageWrapperStyle}">
        ${imageElem}
      </div>
    </div>
  `
}