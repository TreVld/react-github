import { githubReducer } from './github/github.slice';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { gitubApi } from './github/github.api';

export const store = configureStore({
    reducer: {
        [gitubApi.reducerPath]: gitubApi.reducer,
        github: githubReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(gitubApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
