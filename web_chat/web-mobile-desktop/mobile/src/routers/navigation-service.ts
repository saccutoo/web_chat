import { NavigationActions, StackActions } from 'react-navigation';

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

const navigate = (routeName: any, params?: any) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};

function reset(routeName: any, params?: any) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })],
    })
  );
}

function pop() {
  _navigator.dispatch(NavigationActions.back());
}

function popMany(number: number) {
  _navigator.dispatch(
    StackActions.pop({
      n: number,
      immediate: true,
    })
  );
}

function popToTop() {
  _navigator.dispatch(
    StackActions.popToTop()
  );
}

function replace(routeName: any, params: any) {
  _navigator.dispatch(
    StackActions.replace({
      routeName,
      params
    })
  );
}

function getCurrentRoute() {

  let route = _navigator.state.nav;
  while (route.routes) {
    route = route.routes[route.index];
  }
  return route;
}

function goBack(key?: string) {
  _navigator.dispatch(NavigationActions.back({ key }));
}

function push(routeName: any, params: any = {}) {
  _navigator.dispatch(
    StackActions.push({ routeName, params }),
  );
}

export default {
  reset,
  navigate,
  setTopLevelNavigator,
  pop,
  popMany,
  popToTop,
  replace,
  getCurrentRoute,
  goBack,
  push
};
