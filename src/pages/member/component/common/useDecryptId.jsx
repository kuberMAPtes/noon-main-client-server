import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { decryptWithLv, decryptWithLvWithUri, encryptWithLv, encryptWithLvWithUri } from "../../../../util/crypto";

const useDecryptId = () => {
  const { secretId, secretIv } = useParams();
  const [toId, setToId] = useState(null);

  useEffect(() => {
    if (secretId && secretIv) {
      //useParams가 URI인코딩을 알아서 해준다.
      const decryptedId = decryptWithLv(secretId, secretIv);
      // alert(`${secretId} ${secretIv}`);
      // alert("가져온 toId"+decryptedId);
      // alert(`가져온 toId: ${decryptedId}`);
      setToId(decryptedId);
    }
  }, [secretId, secretIv]);

  return { toId };
};

export default useDecryptId;
