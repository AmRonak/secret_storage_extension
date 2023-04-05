import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  initialized: false,
  loggedIn: false,
  encryptedSecret: null,
  secret: null,
  password: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setEncryptedSecret: (state, action) => {
      console.log(action.payload);
      state.encryptedSecret = action.payload;
    },
    setSecret: (state, action) => {
      state.secret = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
})

export const { 
  setInitialized,
  setLoggedIn,
  setEncryptedSecret,
  setSecret,
  setPassword,
  resetInitialized,
  resetLoggedIn,
  resetEncryptedSecret,
  resetSecret,
  resetPassword,
} = userSlice.actions

export default userSlice.reducer