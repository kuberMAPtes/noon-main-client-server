import { useState } from "react"
import ButtonGroup from "../../components/setting/ButtonGroup";
import { useParams } from "react-router-dom";

const PUBLIC_RANGES = [
  {
    id: "PUBLIC",
    title: "전체공개"
  },
  {
    id: "FOLLOWER_ONLY",
    title: "팔로워 공개"
  },
  {
    id: "MUTUAL_ONLY",
    title: "맞팔 공개"
  },
  {
    id: "PRIVATE",
    title: "비공개"
  }
]

export default function MemberSetting() {
  const [memberProfilePublicRange, setMemberProfilePublicRange] = useState("PUBLIC");
  const [allFeedPublicRange, setAllFeedPublicRange] = useState("PUBLIC");
  const [receivingAllNotification, setReceivingAllNotification] = useState(true);
  const [buildingSubscriptionPublicRange, setBuildingSubscriptionPublicRange] = useState("PUBLIC");

  const memberId = useParams().memberId;
  console.log(memberId)

  const COMPONENT_INFOS = [
    {
      type: "MEMBER_PROFILE",
      header: "마이 프로필 공개 설정",
      buttonInfos: PUBLIC_RANGES,
      currentSelected: memberProfilePublicRange,
      callback: (id) => setMemberProfilePublicRange(id)
    },
    {
      type: "ALL_FEED",
      header: "모든 피드 공개 설정",
      buttonInfos: PUBLIC_RANGES,
      currentSelected: allFeedPublicRange,
      callback: (id) => setAllFeedPublicRange(id)
    },
    {
      type: "RECEIVING_ALL_NOTIFICATION",
      header: "알림 수신",
      buttonInfos: [
        {
          id: "true",
          title: "수신"
        },
        {
          id: "false",
          title: "수신하지 않음"
        }
      ],
      currentSelected: receivingAllNotification + "",
      callback: (id) => setReceivingAllNotification(id !== "false")
    },
    {
      type: "BUILDING_SUBSCRIPTION",
      header: "건물 구독 목록 공개 설정",
      buttonInfos: PUBLIC_RANGES,
      currentSelected: buildingSubscriptionPublicRange,
      callback: (id) => setBuildingSubscriptionPublicRange(id)
    }
  ]

  return (
    <div>
      {
        COMPONENT_INFOS.map((data, idx) => (
          <div key={`button-group-${idx}`}>
            <h3>{data.header}</h3>
            <ButtonGroup
              currentSelectedId={data.currentSelected}
              buttonInfos={data.buttonInfos}
              onButtonClick={data.callback}
            />
          </div>
        ))
      }
    </div>
  );
}
