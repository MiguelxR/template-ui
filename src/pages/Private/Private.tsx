import { Navigate, Route } from "react-router";
import { PrivateRoutes } from "../../models/routes";
import CoreLayout from "../../Layouts/CoreLayout";
import RoutesWithNotFound from "../../helpers/RoutesWithNotFound";
import { lazy } from "react";

const DashboardContainer = lazy(
  () => import("./Dashboard/DashboardContainer.page")
);
const ProfileContainer = lazy(() => import("./Profile/ProfileContainer.page"));

const Private = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
      <Route
        path={PrivateRoutes.DASHBOARD}
        element={<CoreLayout children={<DashboardContainer />} />}
      />
      <Route
        path={PrivateRoutes.PROFILE}
        element={<CoreLayout children={<ProfileContainer />} />}
      />
    </RoutesWithNotFound>
  );
};

export default Private;
