import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios_api from "../../../lib/axios_api";
import $ from "jquery";
import wikiStyles from "../../../assets/css/module/building/wiki/GetBuildingWiki.module.css"
import "../../../assets/css/module/building/wiki/GetBuildingWiki.css"
import { FaPencil } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { Spinner } from "reactstrap";
import Header from "../../../components/common/Header";

export const BUILDING_WIKI_BASE_PATH = "/buildingWiki";

export default function GetBuildingWiki() {
  const { buildingId } = useParams();

  const [buildingName, setBuildingName] = useState("");
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  
  useEffect(() => {
    function fetchPageHtml() {
      axios_api.get(`${BUILDING_WIKI_BASE_PATH}/getPage/${buildingId}`).then((response) => {
        const data = response.data;
        setBuildingName(!data.buildingName || data.buildingName === "" ? "이름 없음" : data.buildingName);
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
        setBuildingName("Wiki가 존재하지 않습니다.");
        setContent($(`<p className="mw-parser-output">아마도 위키 페이지 생성 중일 것입니다.</p>`));
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
      setLoading(false);
    }
  }, [content]);

  return (
    <>
      <Header title="위키" />
      <div id="wiki-container" className={wikiStyles.container}>
        <div className={wikiStyles.btnContainer}>
          <FaPencil
              className={wikiStyles.btn}
              onClick={() => navigate(`/editBuildingWiki/${buildingId}`)}
          />
          <FaBuilding
              className={wikiStyles.btn}
              onClick={() => navigate(`/getBuildingProfile/${buildingId}`)}
          />
        </div>
        <h1 className={wikiStyles.title}>{buildingName}</h1>
        <hr className={wikiStyles.contentSeparator} />
        {
          loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" />
            </div>
          ) : (
            <>
              
            </>
          )
        }
      </div>
    </>
  );
}