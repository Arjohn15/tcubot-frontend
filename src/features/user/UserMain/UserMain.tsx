import { FC } from "react";
import UserHeader from "../shared/UserHeader";
import { Outlet } from "react-router-dom";

const UserMain: FC = () => {
  return (
    <div>
      <UserHeader />
      <Outlet />
    </div>
  );
};

export default UserMain;
