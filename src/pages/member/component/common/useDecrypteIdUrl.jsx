import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { decryptWithLv } from '../../../../util/crypto';

const useDecrypteIdUrl = () => {

  const { secretId, secretIv } = useSearchParams();
  const [toId, setToId] = useState(null);

  useEffect(() => {
    if (secretId && secretIv) {
      //useParams가 URI디코딩을 알아서 해준다.
      const decryptedId = decryptWithLv(secretId, secretIv);
      // alert(`${secretId} ${secretIv}`);
      // alert("가져온 toId"+decryptedId);
      // alert(`가져온 toId: ${decryptedId}`);
      setToId(decryptedId);
    }
  }, [secretId, secretIv]);

  return { toId };
};

export default useDecrypteIdUrl;