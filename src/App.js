import { Routes, Route } from "react-router-dom";
import { AuthenticatedRoute } from "./utils/guards/AuthenticatedRoute";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Layout from "./components/layout/Layout";
import { NonAuthenticatedRoute } from "./utils/guards/NonAuthenticatedRoute";
import "./App.css";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* {routes.map(
          ({ component: Component, path, authenticated, childRoutes }) => (
            <Route
              exact
              path={path}
              key={path}
              element={
                authenticated ? (
                  <AuthenticatedRoute>
                    {" "}
                    <Component>
                      {childRoutes.map(
                        ({ childPath, childComponent: ChildComponent }) => (
                          <Route
                            path={childPath}
                            key={childPath}
                            element={<ChildComponent />}
                          />
                        )
                      )}
                    </Component>
                  </AuthenticatedRoute>
                ) : (
                  <NonAuthenticatedRoute>
                    {" "}
                    <Component />
                  </NonAuthenticatedRoute>
                )
              }
            ></Route>
          )
        )} */}

        <Route
          path="/register"
          element={
            <NonAuthenticatedRoute>
              {" "}
              <Register />{" "}
            </NonAuthenticatedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <NonAuthenticatedRoute>
              {" "}
              <Login />{" "}
            </NonAuthenticatedRoute>
          }
        />
        <Route
          exact
          path="/"
          element={
            <AuthenticatedRoute>
              <Layout />
            </AuthenticatedRoute>
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
