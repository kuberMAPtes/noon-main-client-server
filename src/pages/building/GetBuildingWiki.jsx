import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios_api from "../../lib/axios_api";
import Footer from "../../components/common/Footer";
import $ from "jquery";
import wikiStyles from "../../assets/css/module/building/GetBuildingWiki.module.css";
import "../../assets/css/module/building/GetBuildingWiki.css";
import { FaPencil } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";

export const BUILDING_WIKI_BASE_PATH = "/buildingWiki";

export default function GetBuildingWiki() {
  const { buildingId } = useParams();

  const [buildingName, setBuildingName] = useState("");
  const [content, setContent] = useState();

  const navigate = useNavigate();
  
  useEffect(() => {
    function fetchPageHtml() {
      axios_api.get(`${BUILDING_WIKI_BASE_PATH}/getPage/${buildingId}`).then((response) => {
        const data = response.data;
        setBuildingName(data.buildingName);
        console.log(wikiStyles.contentContainer);
        console.log(typeof(wikiStyles.contentContainer));
        const fetched =
            $(data.htmlContent)
                .find("#bodyContent")
                .find(".mw-parser-output")
                .attr("class", `${wikiStyles.contentContainer}`);
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
      content.find(".mw-editsection").remove();
      $(document).find("#wiki-container").append(content);
    }
  }, [content]);

  return (
    <div id="wiki-container" className={wikiStyles.container}>
      <div className={wikiStyles.btnContainer}>
        <FaPencil
            className={wikiStyles.btn}
            onClick={() => navigate(`/editBuildingWiki/${buildingId}`)}
        />
        <RiArrowGoBackFill
            className={wikiStyles.btn}
            onClick={() => navigate(`/getBuildingProfile/${buildingId}`)}
        />
      </div>
      <Footer />
      <h1>{buildingName}</h1>
      <hr className={wikiStyles.contentSeparator} />
    </div>
  );
}