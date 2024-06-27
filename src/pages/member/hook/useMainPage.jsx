import { useState, useEffect } from 'react';
import { generateNavigateUrl } from '../../../../util/crypto';

const useMainPage = (memberId) => {
  const [navigateUrl, setNavigateUrl] = useState(null);

  useEffect(() => {
    const fetchUrl = async () => {
      const url = await generateNavigateUrl(memberId);
      setNavigateUrl(url);
    };

    fetchUrl();
  }, [memberId]);

  return navigateUrl;
};

export default useMainPage;
