import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./features/admin/AdminPage";
import AdminDashboard from "./features/admin/AdminDashboard/AdminDashboard";
import AdminLogIn from "./features/admin/AdminLogIn/AdminLogIn";
import UserRegister from "./features/user/UserRegister/UserRegister";
import UserLogIn from "./features/user/UserLogIn/UserLogIn";
import UserChat from "./features/user/UserChat/UserChat";
import UserPage from "./features/user/UserPage";
import UserProfile from "./features/user/UserProfile/UserProfile";
function App() {
  return (
    <div className="font-main">
      <Router>
        <Routes>
          <Route path="/" element={<UserLogIn />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/user" element={<UserPage />}>
            <Route path="/user/chat" element={<UserChat />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>

          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<AdminLogIn />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
