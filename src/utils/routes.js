import { lazy } from "react";
//{
/* <Route path="/login" element={<NonAuthenticatedRoute><Login /></NonAuthenticatedRoute>} />
<Route path='/home' element={<AuthenticatedRoute><Home/></AuthenticatedRoute>} /> */
//}
const routes = [
  {
    path: "login",
    component: lazy(() => import("../pages/login/Login")),
    authenticated: false,
  },
  {
    path: "home",
    component: lazy(() => import("../pages/home/Home")),
    authenticated: true,
  },
];
export default routes;
