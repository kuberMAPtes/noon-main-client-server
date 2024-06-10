import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 사용자가 로그인을 눌렀어. 그러면 서버에 요청을 보내서 사용자 정보를 가져와.
// 그리고 그 정보를 redux store에 저장해.
// 그리고 사용자가 /로 들어오면 redux store에 있는 사용자 정보를 가져와서 사용자가 로그인을 했는지 안했는지 확인해.

// createAsyncThunk는 비동기 작업을 수행하는 액션 생성자를 만들어주는 함수이다. 액션과 액션 처리 리듀서를 연결해줌
// createAsyncThunk는 두 개의 인자를 받는다. 첫번째인자는 prefix이다. 슬라이스명/액션명 형태로 작성.
// 두번째 인자는 비동기 작업을 수행하는 함수이다. 이 함수는 두 개의 인자를 받는다. 첫번째 인자는 액션의 페이로드이다. 두번째 인자는 thunkAPI이다.

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

console.log(
  "process.env.REACT_APP_API_BASE_URL ::",
  process.env.REACT_APP_API_BASE_URL
);

//dispatch(loginUser(async첫번째인자에 할당할 값))이런식으로 사용한다.
//async함수의 리턴값은 fulfilled의 action.payload로 들어간다.
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ userId, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/json/login",
        { userId, password },
        {
          withCredentials: true,
        }
      );
      console.log("loginUser :: response :: ", response); //{data: {userId: "admin", password: "1234"}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
      if (response.data.userId === null || response.data.userId === undefined) {
        //다시 입력하라고 알림창 띄우기
        console.log("아이디,비밀번호가 틀렸음");
        return rejectWithValue(response.data);
      }
      console.log("로그인 성공");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
      //return thunkAPI.rejectWithValue(error.response.data);해도 됨. { rejectWithValue }는 thunkAPI
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get("/user/json/logout", {
        withCredentials: true,
      });
      if (response.data.message === "ok") {
        console.log("로그아웃 성공.. :: ", response.data.message);
        dispatch(removeUserAndLoggined());
      } else {
        console.log("로그아웃 실패.. :: ", response.data.message);
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const checkSession = createAsyncThunk(
  "user/checkSession",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      console.log("checkSession함수 실행됨");
      const response = await api.get("/user/json/checkSession", {
        withCredentials: true,
      });
      console.log("스프링에서 온 response값 ::", response);
      //값이 잘 왔으면

      console.log("response.data.user값 ::", response.data.user); //{userId: "admin", password: "1234"}

      if (response.data.user !== undefined) {
        // 로그인 상태일 때의 처리
        // 예: Redux store에 사용자 정보 업데이트
        dispatch(setUser(response.data.user));
        //값이 잘 안왔으면
      }
    } catch (error) {
      console.error(error);
    }
  }
);



//{rejectWithValue}는 thunkAPI의 rejectWithValue를 가져온 것이다.
//user가 slice명이고, loginUser는 action명이다.
//user에 isLoggined이라는 속성이 있어야한다.
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggined: false,
    role: "user",
    // loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggined = true;
      console.log("setUser함수 실행됨", action.payload);
      if (action.payload.role === "admin") {
        state.role = "admin";
      }
    },
    // setIsLoggined: (state) => {
    //   state.isLoggined = true;
    // },
    removeUserAndLoggined: (state) => {
      state.user = null;
      state.isLoggined = false;
      state.role = "user";
    },
  },
  //auth/loginUser/pending이라는 액션타입이 createAsyncThunk로 생성된다. 이 액션타입에 대한 액션핸들러를 만들면 된다. 그게 extraReducers builder addCase
  //state는 스토어의 상태야.
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        // 로그인 요청 시작 시 loading을 true로
        // state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // 로그인 성공 시 user 정보를 저장하고 loading을 false로
        // state.loading = false;
        state.user = action.payload;
        state.isLoggined = true;
        console.log(
          "loginUser.fulfilled :: action.payload :: ",
          action.payload
        ); //{userId: "admin", password: "1234"}
        if (action.payload.role === "admin") {
          state.role = "admin";
        }
        /*          else{
            state.role = "user";
        } */
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        // 로그인 실패 시 error를 저장하고 loading을 false로    
        // state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(checkSession.pending, (state) => {
        //아무것도안함
        //왜냐하면 dispatch(setUser(response.data.user));에서 상태관리를 하고 checkSession자체는 상태관리를 안하잖아.
        //loginUser에서는 dispatch(@@)를 안한다.그리고 액션타입에 따른 액션핸들러(pending,fulfilled,rejected)가 상태관리를 한다.
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        //아무것도안함
      })
      .addCase(checkSession.rejected, (state, action) => {
        //아무것도안함.
      })


  },
});

export const { setUser, removeUserAndLoggined } = userSlice.actions;
export default userSlice.reducer;
