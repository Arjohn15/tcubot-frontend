import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./features/admin/AdminPage";
import AdminDashboard from "./features/admin/AdminDashboard/AdminDashboard";
import AdminLogIn from "./features/admin/AdminLogIn/AdminLogIn";
import UserPage from "./features/user/UserPage";
import UserRegister from "./features/user/UserRegister/UserRegister";
import UserLogIn from "./features/user/UserLogIn/UserLogIn";
import UserMain from "./features/user/UserMain/UserMain";
import UserChat from "./features/user/UserChat/UserChat";
function App() {
  return (
    <div className="font-main">
      <Router>
        <Routes>
          <Route path="/" element={<UserPage />}>
            <Route index element={<UserLogIn />} />
            <Route path="/register" element={<UserRegister />} />
          </Route>
          <Route path="/user" element={<UserMain />}>
            <Route index element={<UserChat />} />
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
