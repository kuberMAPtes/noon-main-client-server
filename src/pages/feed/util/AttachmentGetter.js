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

      if (contentType.includes("image")) {
        const imageBlob = new Blob([response.data], { type: contentType });
        const imageObjectURL = URL.createObjectURL(imageBlob);
        // console.log("이미지 생성");
        return { type: "image", url: imageObjectURL };
      } else if (contentType.includes("video")) {
        const videoBlob = new Blob([response.data], { type: contentType });
        const videoObjectURL = URL.createObjectURL(videoBlob);
        // console.log("동영상 생성");
        return { type: "video", url: videoObjectURL };
      } else {
        console.log("Unsupported attachment type:", contentType);
        return null;
      }
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
