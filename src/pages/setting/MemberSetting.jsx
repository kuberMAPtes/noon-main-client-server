import { useEffect, useState } from "react"
import PublicRangeDropdown from "./component/PublicRangeDropdown";
import axios_api from "../../lib/axios_api";
import { MAIN_API_URL } from "../../util/constants";
import { is2xxStatus } from "../../util/statusCodeUtil";
import BasicNavbar from "../../components/common/BasicNavbar";
import "./css/MemberSetting.css";
import OpInfoModal from "./component/OpInfoModal";

const PUBLIC_RANGES = [
  {
    id: "PUBLIC",
    title: "전체공개",
  },
  {
    id: "FOLLOWER_ONLY",
    title: "팔로워 공개",
  },
  {
    id: "MUTUAL_ONLY",
    title: "맞팔 공개",
  },
  {
    id: "PRIVATE",
    title: "비공개"
  }
]

const SAMPLE_MEMBER_ID = "member_2";

export default function MemberSetting() {
  const [memberProfilePublicRange, setMemberProfilePublicRange] =
    useState("PUBLIC");
  const [allFeedPublicRange, setAllFeedPublicRange] = useState("PUBLIC");
  const [receivingAllNotification, setReceivingAllNotification] =
    useState(true);
  const [buildingSubscriptionPublicRange, setBuildingSubscriptionPublicRange] =
    useState("PUBLIC");
  const [opInfoMode, setOpInfoMode] = useState("termsAndPolicy");
  const [opInfoModalVisible, setOpInfoModalVisible] = useState(false);

  const memberId = SAMPLE_MEMBER_ID;

  useEffect(() => {
    fetchSettingInfo(memberId, (setting) => {
      setMemberProfilePublicRange(setting.memberProfilePublicRange);
      setAllFeedPublicRange(setting.allFeedPublicRange);
      setBuildingSubscriptionPublicRange(
        setting.buildingSubscriptionPublicRange
      );
      setReceivingAllNotification(setting.receivingAllNotificationAllowed);
    });
  }, [memberId]);

  const COMPONENT_INFOS = [
    {
      type: "MEMBER_PROFILE",
      header: "마이 프로필 공개 설정",
      buttonInfos: PUBLIC_RANGES,
      currentSelected: memberProfilePublicRange,
      callback: (id) => setMemberProfilePublicRange(id),
    },
    {
      type: "ALL_FEED",
      header: "모든 피드 공개 설정",
      buttonInfos: PUBLIC_RANGES,
      currentSelected: allFeedPublicRange,
      callback: (id) => setAllFeedPublicRange(id),
    },
    {
      type: "RECEIVING_ALL_NOTIFICATION",
      header: "알림 수신",
      buttonInfos: [
        {
          id: "true",
          title: "수신",
        },
        {
          id: "false",
          title: "수신하지 않음",
        },
      ],
      currentSelected: receivingAllNotification + "",
      callback: (id) => setReceivingAllNotification(id !== "false"),
    },
    {
      type: "BUILDING_SUBSCRIPTION",
      header: "건물 구독 목록 공개 설정",
      buttonInfos: PUBLIC_RANGES,
      currentSelected: buildingSubscriptionPublicRange,
      callback: (id) => setBuildingSubscriptionPublicRange(id),
    },
  ];

  return (
    <div>
      <BasicNavbar />
      <main className="container">
        <h1>환경설정</h1>
        <div className="setting-content-wrapper">
          {
            COMPONENT_INFOS.map((data, idx) => (
              <div className="setting-content" key={`button-group-${idx}`}>
                <h3>{data.header}</h3>
                <PublicRangeDropdown
                  currentSelectedId={data.currentSelected}
                  buttonInfos={data.buttonInfos}
                  onButtonClick={data.callback}
                />
              </div>
            ))
          }
        </div>
        <button className="btn--apply-setting" type="button" onClick={() => {
          axios_api.post(`${MAIN_API_URL}/setting/updateSetting/${memberId}`, {
            memberProfilePublicRange,
            allFeedPublicRange,
            buildingSubscriptionPublicRange,
            receivingAllNotification
          }).then((response) => {
            if (is2xxStatus(response.status)) {
              alert("환경설정이 적용되었습니다");
            }
          }).catch((err) => {
            console.error(err);
          })
        }}>변경사항 저장</button>
        <button className="btn--opinfo" type="button" onClick={() => {
          setOpInfoMode("termsAndPolicy");
          setOpInfoModalVisible(true);
        }}>약관 및 정책</button>
        <button className="btn--opinfo" type="button" onClick={() => {
          setOpInfoMode("termsOfUse");
          setOpInfoModalVisible(true);
        }}>이용규정</button>
        <OpInfoModal
            visible={opInfoModalVisible}
            setVisible={setOpInfoModalVisible}
            mode={opInfoMode}
        />
      </main>
    </div>
  );
}

/**
 * @param {string} memberId
 * @param {({
 *   memberProfilePublicRange: string;
 *   allFeedPublicRange: string;
 *   buildingSubscriptionPublicRange: string;
 *   receivingAllNotificationAllowed: boolean;
 * }) => void} callback
 */
function fetchSettingInfo(memberId, callback) {
  axios_api
    .get(`${MAIN_API_URL}/setting/getSetting/${memberId}`)
    .then((response) => {
      callback(response.data);
    });
}
