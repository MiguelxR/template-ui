import type { Roles } from "../models/roles";
import { PrivateRoutes } from "../models/routes";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { AppStore } from "../redux/store";

interface Props {
  role: Roles;
}

const RoleGuard = ({ role }: Props) => {
  const userState = useSelector((store: AppStore) => store.user);
  return userState.role === role ? (
    <Outlet />
  ) : (
    <Navigate replace to={PrivateRoutes.PRIVATE} />
  );
};

export default RoleGuard;
