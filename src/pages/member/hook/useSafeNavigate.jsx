import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSafeNavigate = (navigate) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSafeNavigation = (path) => {
    setIsNavigating(true);
    navigate(path);
  };

  return [isNavigating,setIsNavigating, handleSafeNavigation];
};

export default useSafeNavigate;
