import axios_api from "../../../lib/axios_api";

// 첨부파일 처리
const AttachmentGetter = async (feedAttachmentId) => {
  let url = `/feed/getFeedAttachment?attachmentId=${feedAttachmentId}`;
  try {
    const response = await axios_api.get(url, {
      responseType: "arraybuffer",
    });

    if (response.data && response.data.byteLength > 0) {
      const contentType =
        response.headers["content-type"] || "application/octet-stream";
      const imageBlob = new Blob([response.data], { type: "image/jpeg" }); // 일단 사진만 출력
      const imageObjectURL = URL.createObjectURL(imageBlob);

      return imageObjectURL;
    } else {
      console.log(feedAttachmentId + " 데이터가 없음");
      return null;
    }
  } catch (e) {
    if (e.response && e.response.status === 404) {
      console.log("Attachment not found (404)");
    } else {
      console.log(e);
    }
  }
};

export default AttachmentGetter;
