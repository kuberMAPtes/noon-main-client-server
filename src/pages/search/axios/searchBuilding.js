import axios_api from "../../../lib/axios_api";

export default function searchBuilding(searchKeyword, page, callback) {
    axios_api.get("/buildingProfile/searchBuilding", {
        params: {
            searchKeyword,
            page
        }
    }).then((response) => callback(response.data));
}