import { useState, useEffect } from 'react';
import { encryptWithLvWithUri } from '../../../../util/crypto';

const useEncryptId = (toId) => {
  const [encryptedData, setEncryptedData] = useState(null);
  const [ivData, setIvData] = useState(null);

  useEffect(() => {
    if (toId) {
      const { encryptedData, ivData } = encryptWithLvWithUri(toId);
      setEncryptedData(encryptedData);
      setIvData(ivData);
    }
  }, [toId]);

  return { encryptedData, ivData };
};

export default useEncryptId;
