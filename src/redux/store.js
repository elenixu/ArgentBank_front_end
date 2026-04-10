import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../reducers/user/userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
})

export const persistor = persistStore(store)

export default store
