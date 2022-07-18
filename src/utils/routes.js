import { lazy } from "react";
const routes = [
  {
    path: "/login",
    component: lazy(() => import("../pages/login/Login")),
    authenticated: false,
    childRoutes: {},
  },
  {
    path: "/register",
    component: lazy(() => import("../pages/register/Register")),
    authenticated: false,
    childRoutes: {},
  },
  {
    path: "/",
    component: lazy(() => import("../components/layout/Layout")),
    authenticated: true,
    childRoutes: [
      {
        childPath: "/",
        childComponent: lazy(() => import("../pages/home/Home")),
      },
      {
        childPath: "/users",
        childComponent: lazy(() => import("../pages/users/Users")),
      },
      {
        childPath: "/users/:id",
        childComponent: lazy(() => import("../pages/user-details/UserDetails")),
      },
    ],
  },
];
{
  /* <Route path="/" element={<Home />} />
<Route path="/users" element={<Users />} />
<Route path="/users/:id" element={<UserDetails />} /> */
}
export default routes;
