export default function configureStore(sagaMiddleware: any): import("redux").Store<import("redux").CombinedState<{
    userInfo: any;
}>, import("redux").AnyAction> & {
    dispatch: unknown;
};
