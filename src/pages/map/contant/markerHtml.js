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
  return getCommonHtml(`<div>${buildingName}</div>`, "/image/popular-bulilding.png");
}

export function getSubscriptionMarkerHtml(subscriptionProvider, buildingName, activated) {
  const content = `
    <div>${subscriptionProvider}</div>
    <div>${buildingName}</div>
  `;
  return getCommonHtml(content,
      activated
          ? "/image/subscription-bulilding.png"
          : "/image/not-activated-building.png");
}

const LIVELINESS_COLOR = {
  5: "#e03131",
  4: "#f08c00",
  3: "#ffd43b",
  2: "#37b24d",
  1: "#adb5bd"
}

export function getLiveliestChatroomMarkerHtml(chatroomName, liveliness) {
  const content = `<div style="color: ${LIVELINESS_COLOR[liveliness]}">${chatroomName}</div>`;
  return getCommonHtml(content, "/image/chat.png");
}

const LIVELINESS_COLOR = {
  5: "#e03131",
  4: "#f08c00",
  3: "#ffd43b",
  2: "#37b24d",
  1: "#adb5bd"
}

export function getLiveliestChatroomMarkerHtml(chatroomName, liveliness) {
  const content = `<div style="color: ${LIVELINESS_COLOR[liveliness]}">${chatroomName}</div>`;
  return getCommonHtml(content, "/image/chat.png");
}

/**
 * @param {string} roadAddress 
 * @param {string} placeName 
 * @param {string} markerImage
 */
export function getPlaceSearchMarkerHtml(
    roadAddress,
    placeName,
    markerImage = "./image/marker.png"
) {
  const content = `
    <div style="width: fit-content">${placeName}</div>
    <div style="width: fit-content">${roadAddress}</div>
  `;

  return getCommonHtml(content, markerImage)
}

/**
 * @param {string} content 
 * @param {string} markerImage 
 */
function getCommonHtml(content, markerImage) {
  return `
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; height: fit-content; margin: 0px; padding: 0px">
      <div style="text-align: center; overflow: hidden; white-space: nowrap; display: flex; flex-direction: column; justify-content: center; align-items: center">
        ${content}
      </div>
      <div style="display: flex; justify-content: center; align-items: center; ">
        <img src="${markerImage}" style="width: 20px; height: 25px; margin: 0px; padding: 0px" />
      </div>
    </div>
  `
}