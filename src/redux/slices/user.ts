import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isAuth: boolean;
}

const initialState: UserState = {
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = true;
    },
  },
});

export const { setIsAuth } = userSlice.actions;

export default userSlice.reducer;
