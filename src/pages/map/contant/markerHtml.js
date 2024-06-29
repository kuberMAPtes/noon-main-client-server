import { MARKER_MODES } from "../component/MarkerModeButtonGroup";

const liveliness = {
  1: "#e03131",
  2: "#f08c00",
  3: "#ffd43b",
  4: "#37b24d",
  5: "#adb5bd",
  6: "#212529"
}

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
    liveliestChatroom,
    buildingName,
    currentMarkerDisplayMode
) {
  let content;
  switch (currentMarkerDisplayMode) {
    case MARKER_MODES.DISPLAY_BUILDING_NAME:
      content = `<div>${buildingName}</div>`;
      break;
    case MARKER_MODES.DISPLAY_LIVELIEST_CHATROOM:
      content = `<div>${liveliestChatroom.chatroomName}</div>`
      break;
    default:
      content = `<div></div>`;
  }
  return getCommonHtml(content, "/image/popular-bulilding.png");
}

export function getSubscriptionMarkerHtml(subscriptionProviderList, buildingName) {
  const content = `
    <div>${subscriptionProviderList[0]}</div>
    <div>${buildingName}</div>
  `;
  return getCommonHtml(content, "/image/subscription-bulilding.png");
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