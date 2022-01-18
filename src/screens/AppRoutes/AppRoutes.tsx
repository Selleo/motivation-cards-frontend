import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "../Admin";
import Workspace from "../Workspace";
import Login from "../Login";
import TeamDetails from "../TeamDetails";
import User from "../User";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Workspace as init route just for development */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/team-details" element={<TeamDetails />} />
      <Route path="/user" element={<User />} />
      <Route path="/workspace" element={<Workspace />} />
      {/* <Route
        path="*"
        element={
          <Navigate
            to={localStorage.getItem("api_token") ? "/user" : "/login"}
          />
        }
      /> */}
    </Routes>
  );
};

export default AppRoutes;
