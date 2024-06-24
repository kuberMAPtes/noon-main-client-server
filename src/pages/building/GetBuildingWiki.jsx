import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios_api from "../../lib/axios_api";
import Footer from "../../components/common/Footer";
import $ from "jquery";

export const BUILDING_WIKI_BASE_PATH = "/buildingWiki";

export default function GetBuildingWiki() {
  const { buildingId } = useParams();

  const [buildingName, setBuildingName] = useState("");
  const [content, setContent] = useState();
  
  useEffect(() => {
    function fetchPageHtml() {
      axios_api.get(`${BUILDING_WIKI_BASE_PATH}/getPage/${buildingId}`).then((response) => {
        const data = response.data;
        setBuildingName(data.buildingName);
        const fetched = $(data.htmlContent).find("#bodyContent").find(".mw-parser-output").attr("class", "mw-parser-output");
        console.log(fetched);
        setContent(fetched);
      }).catch((err) => {
        console.log(err);
        setBuildingName("");
        setContent(`<p className="mw-parser-output">404 Not Found</p>`);
      })
    }

    if (!content) {
      fetchPageHtml();
    }
  }, []);

  useEffect(() => {
    if (content) {
      $(document).find(".mw-parser-output").remove();
      $(document).find("#wiki-container").append(content);
    }
  }, [content]);

  return (
    <div id="wiki-container" className="container">
      <Footer />
      <h2>{buildingName}</h2>
    </div>
  );
}