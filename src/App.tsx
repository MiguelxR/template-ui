import { Suspense, lazy } from "react";
import CoreLayout from "./Layouts/CoreLayout";
import { Route, Navigate, BrowserRouter } from "react-router";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import RoutesWithNotFound from "./helpers/RoutesWithNotFound";
import { Provider } from "react-redux";
import store from "./redux/store";
import Logout from "./components/Logout/Logout";
import RoleGuard from "./guards/Role.guard";
import { Roles } from "./models/roles";
import AuthGuard from "./guards/Auth.guard";

const DashboardContainer = lazy(
  () => import("./pages/Private/Dashboard/DashboardContainer.page")
);
const LoginContainer = lazy(() => import("./pages/Login/LoginContainer.page"));
const Private = lazy(() => import("./pages/Private/Private"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <BrowserRouter>
            <Logout />
            <RoutesWithNotFound>
              <Route
                path="/"
                element={<Navigate to={PrivateRoutes.PRIVATE} />}
              />
              <Route
                path={PublicRoutes.LOGIN}
                element={<CoreLayout children={<LoginContainer />} />}
              />
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
              <Route element={<RoleGuard role={Roles.ADMIN} />}>
                <Route
                  path={PrivateRoutes.DASHBOARD}
                  element={<CoreLayout children={<DashboardContainer />} />}
                />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </>
  );
}

export default App;
