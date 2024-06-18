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
    subscriptionProviderList,
    liveliestChatroom,
    buildingName,
    markerImage = "./image/marker.png"
) {
  const content = `
    <p>${subscriptionProviderList[0]}</p>
    <p>${liveliestChatroom.chatroomName}</p>
    <p>${buildingName}</p>
  `;
  return getCommonHtml(content, markerImage);
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
    <p>${placeName}</p>
    <p>${roadAddress}</p>
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
      <div style="text-align: center;">
        ${content}
      </div>
      <div style="display: flex; justify-content: center; align-items: center; ">
        <img src="${markerImage}" style="width: 40px; height: 50px; margin: 0px; padding: 0px" />
      </div>
    </div>
  `
}