import {createStore, combineReducers} from 'redux'
import { persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import { AuthUser } from './slice/auth'
import { UserSLice } from './slice/user'
import { UrlSlice } from "./slice/urlImg"

const persistedReducer = {
    key: 'root',
    storage
}

const reducersConfigure = combineReducers({
    auth: AuthUser,
    user: UserSLice,
    img: UrlSlice
})

const store = createStore(persistReducer(persistedReducer, reducersConfigure))
const persistor = persistStore(store)

export {store, persistor}