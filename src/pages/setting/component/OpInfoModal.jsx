import { Modal } from "react-bootstrap";
import { termsAndPolicy } from "../constants/termsAndPolicy";
import { termsOfUse } from "../constants/termsOfUse";
import { useState } from "react";
import "../css/OpInfoModal.css";

const operationInfoText = {
  termsAndPolicy: {
    title: "약관 및 정책",
    content: termsAndPolicy
  },
  termsOfUse: {
    title: "이용규정",
    content: termsOfUse
  }
};


export default function OpInfoModal({
  visible, setVisible, mode
}) {
  return (
    <Modal show={visible} onHide={() => setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{operationInfoText[mode].title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OpInfoContent mode={mode} />
      </Modal.Body>
    </Modal>
  );
}

function OpInfoContent({mode}) {
  const [page, setPage] = useState(0);

  const contentChunk = operationInfoText[mode].content;

  const contentSlice = contentChunk[page].split("\n").map((c) => c.trim());

  console.log(contentSlice);
  return (
    <>
      {
        contentSlice.map((c, idx) => <p key={`op-${idx}`}>{c}</p>)
      }
      <div className="btn-opinfo-pagination">
        <button disabled={page <= 0} onClick={() => {
          if (page > 0) {
            setPage(page - 1);
          }
        }}>이전</button>
        <div>{page + 1} / {contentChunk.length}</div>
        <button disabled={page >= contentChunk.length - 1} onClick={() => {
          if (page < contentChunk.length - 1) {
            setPage(page + 1);
          }
        }}>이후</button>
      </div>
    </>
  )
}