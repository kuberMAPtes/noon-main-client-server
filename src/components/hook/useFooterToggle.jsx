import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFooterEnbaled } from '../../redux/slices/footerEnabledSlice';
import { useLocation } from 'react-router-dom';


const useFooterToggle = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFooterEnbaled(false));
    return () => {
      dispatch(setFooterEnbaled(true));
    }
  });
};
export default useFooterToggle;

//기본이 true야 false로 했어. 작동하지. 같아졌어. 