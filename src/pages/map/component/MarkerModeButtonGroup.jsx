import { Button } from "react-bootstrap";
import styles from "../../../assets/css/module/map/MarkerModeButtonGroup.module.css";

export const MARKER_MODES = {
  DISPLAY_BUILDING_NAME: 0,
  DISPLAY_LIVELIEST_CHATROOM: 1,
  DISPLAY_NONE: 2
}

const buttonInfos = [
  {
    markerMode: MARKER_MODES.DISPLAY_BUILDING_NAME,
    title: "건물명"
  }, {
    markerMode: MARKER_MODES.DISPLAY_LIVELIEST_CHATROOM,
    title: "활발한 채팅방"
  },
  {
    markerMode: MARKER_MODES.DISPLAY_NONE,
    title: "X"
  }
]

export default function MarkerModeButtonGroup({
  currentMarkerDisplayMode,
  setCurrentMarkerDisplayMode
}) {
  return (
    <div className={styles.container}>
      {
        buttonInfos.map((info, idx) => (
          <Button
              key={`mode-seletion-button-${idx}`}
              onClick={() => setCurrentMarkerDisplayMode(info.markerMode)}
              className={currentMarkerDisplayMode === info.markerMode ? styles.selected : ""}
              disabled={currentMarkerDisplayMode === info.markerMode}
          >
            {info.title}
          </Button>
        ))
      }
    </div>
  );
}