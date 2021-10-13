import userReducer from "../utils/slices/userSlice";
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({  reducer: {
    auth: userReducer
}})
export default store;