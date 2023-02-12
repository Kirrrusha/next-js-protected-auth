import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { createWrapper, MakeStore, HYDRATE } from "next-redux-wrapper";
import { authSlice } from "./slices/auth";
import { frogsSlice } from "./slices/frogs";

// Combine all the slices we created together.
const combinedReducers = combineReducers({
  authReducer: authSlice.reducer,
  frogsReducer: frogsSlice.reducer,
});

// Type that indicates our whole State will be used for useSelector and other things.
export type OurStore = ReturnType<typeof combinedReducers>;

const rootReducer = (
  state: ReturnType<typeof combinedReducers>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducers(state, action);
};

export const store = configureStore<OurStore>({
  reducer: rootReducer,
});

const makeStore: MakeStore = () => store;

export const wrapper = createWrapper(makeStore, { storeKey: "key" });

// Type that will be used to type useDispatch() for async actions.
export type MyThunkDispatch = typeof store.dispatch;
