// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "../app/rootReducer.js";
// import { authapi } from "../features/api/authapi.js";
// import { courseApi } from "../features/api/courseApi.js";

// export const appStore = configureStore({
//   reducer: {
//     root: rootReducer,
//     [authapi.reducerPath]: authapi.reducer, // Required for RTK Query
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authapi.middleware, courseApi.middleware),
// });

// const initializeApp = async()=>{

//     await appStore.dispatch(authapi.endpoints.loadUser.initiate({}, {forceRefetch:true}))
// }


// initializeApp()

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../app/rootReducer.js";
import { authapi } from "../features/api/authapi.js";
import { courseApi } from "../features/api/courseApi.js";
import { purchaseApi } from "../features/api/purchaseApi.js";
import { courseProgressApi } from "../features/api/courseProgressApi.js";

export const appStore = configureStore({
  reducer: {
    root: rootReducer,
    [authapi.reducerPath]: authapi.reducer,
    [courseApi.reducerPath]: courseApi.reducer, 
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [courseProgressApi.reducerPath]: courseProgressApi.reducer, // ✅ FIXED: Added courseApi reducer
     // ✅ FIXED: Added courseApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authapi.middleware, courseApi.middleware,purchaseApi.middleware,courseProgressApi.middleware),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authapi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
