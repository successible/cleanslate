import { type Dispatch, store } from "../store/store";

export const getDispatch = (): Dispatch => store.dispatch;
