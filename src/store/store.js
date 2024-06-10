import { combineReducers } from "@reduxjs/toolkit";
import { createStore } from "@reduxjs/toolkit";

/**
 *  Action 은 사용할 js에서, Store 와 그 안에 들어갈 Reducer 는 이 곳에서 정의.
 *  useDispatch 를 통해 Action 을 Reducer 에 전달하며
 *  useSelector 를 통해 Reducer 에 있던 state 를 가져온다?
 */

// create action
export const setChatroomData = (data) => ({
  type: 'SET_CHATROOM_DATA',
  payload: data
})

export const addChatroomData = (data) => ({
  type: 'ADD_CHATROOM_DATA',
  payload: data
})

export const addLoginUserData = (data) => ({
  type: 'ADD_USER_DATA',
  payload: data
})

// create a reducer
const initialState = {
  chatroomData: null,
}
const chatroomReducer = (state = initialState, action) => {
  switch (action.type){
    
    // MyChatroomList.js 에서 setChatroom axios 요청 후 Dispatch
    case 'SET_CHATROOM_DATA': 
      return {
        ...state,
        chatroomData: action.payload
      };

    // chatroomCreation.js 에서 addChatroom axios 요청 후 Dispatch
    case 'ADD_CHATROOM_DATA':
      return {
        ...state,
        chatroomData : action.payload
      };

    default:
      return state;
  }
}

const loginUserReducer = (state = initialState, action) => {
  switch (action.type){

    case 'ADD_USER_DATA':
      return {
        ...state,
        loginUserData : action.payload
      };

    default:
      return state;
  }
} 

// combine reducer
const rootReducer = combineReducers({
  chatroom: chatroomReducer,
  loginuser: loginUserReducer
})

// put reducer into store
const store = createStore(rootReducer);

export default store;