import { Routes, Route } from "react-router-dom";
import { AuthenticatedRoute } from "./utils/guards/AuthenticatedRoute";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Layout from "./components/layout/Layout";
import { NonAuthenticatedRoute } from "./utils/guards/NonAuthenticatedRoute";
import "./App.css";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import UserDetails from "./pages/user-details/UserDetails";
import Admin from "./pages/admin/Admin";
import { AdminRoute } from "./utils/guards/AdminRoute";

function App() {
  return (
    <div className="App">
      <Routes>
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
          path="/"
          element={
            <AuthenticatedRoute>
              <Layout />
            </AuthenticatedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
