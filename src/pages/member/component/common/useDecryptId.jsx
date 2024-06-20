import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { decryptWithLvWithUri } from "../../../../util/crypto";

const useDecryptId = () => {
  const { secretId, secretIv } = useParams();
  const [toId, setToId] = useState(null);

  useEffect(() => {
    if (secretId && secretIv) {
      const decryptedId = decryptWithLvWithUri(secretId, secretIv);
      // alert(`${secretId} ${secretIv}`);
      // alert(decryptedId);
      setToId(decryptedId);
    }
  }, [secretId, secretIv]);

  return { toId };
};

export default useDecryptId;
