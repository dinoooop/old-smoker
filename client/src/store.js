import { configureStore } from '@reduxjs/toolkit'
import authReducer from './front/auth/authSlice'
import ProjectReducer from './admin/project/projectSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    project:ProjectReducer
  }
})