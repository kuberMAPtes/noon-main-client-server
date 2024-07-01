// import { useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setFooterEnbaled } from '../../redux/slices/footerEnabledSlice';
// import { useLocation } from 'react-router-dom';


// const useFooterToggle = (initialState) => {
//   const dispatch = useDispatch();
//   const footerEnabled = useSelector((state) => state.footerEnabled.value);
//   const location = useLocation();
//   const prevLocation = useRef(location);

//   useEffect(() => {
//     // alert("footerEnabled :: "+footerEnabled+"  initialState :: " + initialState);
//     if(footerEnabled!==initialState){
//       // alert("셋합니다. :: " + initialState);
//       dispatch(setFooterEnbaled(initialState));
//     }
//     // return () => {
//     //   // alert("useFooterToggle있는 컴포넌트 언마운트");
//     //   dispatch(setFooterEnbaled(!initialState));
//     // };

//   }, [dispatch, initialState, footerEnabled]);

//   useEffect(() => {
//     if (prevLocation.current.pathname !== location.pathname) {
//       console.log('Location changed from:', prevLocation.current.pathname, 'to:', location.pathname);
//       prevLocation.current = location;
//       dispatch(setFooterEnbaled(!initialState));
//     }
//   }, [location, dispatch, initialState]);

// };

// export default useFooterToggle;

// //기본이 true야 false로 했어. 작동하지. 같아졌어. 