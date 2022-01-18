import { Routes, Route } from "react-router-dom";
import Admin from "../Admin";
import Login from "../Login";
import TeamDetails from "../TeamDetails";
import User from "../User";
import UserMotivators from "../UserMotivators";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/team-details" element={<TeamDetails />} />
      <Route path="/user" element={<User />} />
      <Route path="/user-motivators" element={<UserMotivators />} />
    </Routes>
  );
};

export default AppRoutes;
