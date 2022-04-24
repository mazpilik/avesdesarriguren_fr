export const routesUtiles = {
  // parse route with parameters
  parseRouteWithParams(route: string, params: any) {
    let parsedRoute = route;
    Object.keys(params).forEach((key) => {
      parsedRoute = parsedRoute.replace(`:${key}`, params[key]);
    });
    return parsedRoute;
  },
};
