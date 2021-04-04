declare const rootReducers: import("redux").Reducer<import("redux").CombinedState<{
    userInfo: any;
}>, import("redux").AnyAction>;
export default rootReducers;
export declare type AppState = ReturnType<typeof rootReducers>;
