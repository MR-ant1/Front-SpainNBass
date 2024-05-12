
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk"
import userSlice from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt"
import  detailSlice  from "./slices/postDetailSlice";
import communitySlice from "./slices/communitySlice";


const reducers = combineReducers({
    user: userSlice,
    detail: detailSlice,
    community: communitySlice
});

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        encryptTransform({
            secretKey: 'BOMBOCLAAT',
            onError: function (error) {
                throw new Error(error)
            }
        })
    ]
};

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk)
});