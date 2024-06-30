import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { decryptWithLv } from '../../../util/crypto';

const useDecrypteIdUrl = () => {
  const [searchParams] = useSearchParams();
  const [toId, setToId] = useState(null);

  useEffect(() => {
    const secretId = searchParams.get('secretId');
    const secretIv = searchParams.get('secretIv');
    
    // alert(`secretId: ${secretId}, secretIv: ${secretIv}`);
    
    if (secretId && secretIv) {
      const decryptedId = decryptWithLv(secretId, secretIv);
      // alert(`가져온 toId: ${decryptedId}`);
      setToId(decryptedId);
    }
  }, [searchParams]);

  return { toId };
};

export default useDecrypteIdUrl;
