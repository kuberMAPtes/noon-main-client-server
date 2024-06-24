import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios_api from "../../lib/axios_api";
import { BUILDING_WIKI_BASE_PATH } from "./GetBuildingWiki";
import $ from "jquery";
import Footer from "../../components/common/Footer";
import styles from "../../assets/css/module/building/EditBuildingWiki.module.css";
import { Button } from "react-bootstrap";

export default function EditBuildingWiki() {
  const { buildingId } = useParams();

  const [buildingName, setBuildingName] = useState("");
  const [content, setContent] = useState();

  const textareaRef = useRef(null);

  const navigate = useNavigate();

  console.log(content);

  useEffect(() => {
    axios_api.get(`${BUILDING_WIKI_BASE_PATH}/getEditPage/${buildingId}`)
        .then((response) => {
          const data = response.data;
          setBuildingName(data.buildingName);
          const fetched = $(data.htmlContent).find("#editform");
          console.log(fetched);
          setContent({
            wpTextbox1: fetched.find(`textarea[name="wpTextbox1"]`).text(),
            wpUnicodeCheck: fetched.find(`input[name="wpUnicodeCheck"]`).val(),
            wpAntispam: fetched.find(`input[name="wpAntispam"]`).val(),
            wikieditorUsed: fetched.find(`input[name="wikieditorUsed"]`).val(),
            wpSection: fetched.find(`input[name="wpSection"]`).val(),
            wpStarttime: fetched.find(`input[name="wpStarttime"]`).val(),
            wpEdittime: fetched.find(`input[name="wpEdittime"]`).val(),
            editRevId: fetched.find(`input[name="editRevId"]`).val(),
            wpScrolltop: fetched.find(`input[name="wpScrolltop"]`).val(),
            wpAutoSummary: fetched.find(`input[name="wpAutoSummary"]`).val(),
            oldid: fetched.find(`input[name="oldid"]`).val(),
            parentRevId: fetched.find(`input[name="parentRevId"]`).val(),
            format: fetched.find(`input[name="format"]`).val(),
            model: fetched.find(`input[name="model"]`).val(),
            wpSummary: fetched.find(`input[name="wpSummary"]`).val(),
            wpEditToken: fetched.find(`input[name="wpEditToken"]`).val(),
            mode: fetched.find(`input[name="mode"]`).val(),
            wpUltimateParam: fetched.find(`input[name="wpUltimateParam"]`).val()
          });
        })
  }, []);

  useEffect(() => {
    if (textareaRef.current && content) {
      textareaRef.current.value = content.wpTextbox1;
    }
  }, [content, textareaRef.current]);

  return (
    <div className="container">
      <div id="wiki-edit-container" className={styles.wikiEditContainer}>
        <h2>{buildingName}</h2>
        <textarea
            className={styles.wikiTextArea}
            name="wpTextbox1"
            ref={textareaRef}
            onChange={(e) => {
              console.log(e.target.value);
              setContent({...content, wpTextbox1: e.target.value});
            }} 
        />
        <Button onClick={() => {
          axios_api.post(`${BUILDING_WIKI_BASE_PATH}/editPage/${buildingId}`, content)
              .then((response) => {
                alert("변경사항이 저장되었습니다.");
                navigate(-1);
              })
              .catch((err) => {
                console.error(err);
              });
        }}>변경사항 저장</Button>
      </div>
      <Footer />
    </div>
  );
}