import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { userAPI } from "../services/UserServices";


const rootReducer = combineReducers({
    //
    [userAPI.reducerPath]: userAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(userAPI.middleware)
    })
}

