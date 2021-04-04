declare const store: import("redux").Store<import("redux").CombinedState<{
    userInfo: any;
}>, import("redux").AnyAction> & {
    dispatch: unknown;
};
export default store;
