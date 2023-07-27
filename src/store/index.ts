

import formSlice from './formSlice'
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger'
// import usersSlice from "./usersSlice";
import { usersApi } from '../services/users.service';
import { productsApi } from '../services/products.service';

// initial states here
const preloadedState = {};

const reducer = {
    form: formSlice,
    // users: usersSlice,
}
const logger = createLogger({
    collapsed: true,
});
export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [usersApi.reducerPath]: usersApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        form: reducer.form,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger).concat(usersApi.middleware).concat(productsApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
})




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
