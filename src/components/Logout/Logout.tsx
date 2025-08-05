import { useNavigate } from "react-router";
import { clearLocalStorage } from "../../helpers/localStorage.helper";
import { PublicRoutes } from "../../models/routes";
import { resetUser, UserKey } from "../../redux/states/user";
import { useDispatch } from "react-redux";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  };
  return <button onClick={logOut}>Logout</button>;
};

export default Logout;
