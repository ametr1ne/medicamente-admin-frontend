export const paths = {
  LOGIN: "/login",
  HOME: "/",
  EXPERTS: "/experts",
  PRICES: "/prices",
  PERMISSION_DENIED: "/permission-denied",
  SERVICES: "/services",
};

export const publicRoutes = [paths.LOGIN, paths.PERMISSION_DENIED];
export const privateRoutes = [paths.EXPERTS, paths.PRICES, paths.SERVICES];
