import { lazy } from "react";
const routes = [
  {
    path: "login",
    component: lazy(() => import("../pages/login/Login")),
    authenticated: false,
  },
  {
    path: "register",
    component: lazy(() => import("../pages/register/Register")),
    authenticated: false,
  },
  {
    path: "home",
    component: lazy(() => import("../pages/home/Home")),
    authenticated: true,
  },
];
export default routes;
