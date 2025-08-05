import { use, useCallback, useEffect, useState } from "react";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearLocalStorage } from "../../helpers/localStorage.helper";
import { createUser, resetUser, UserKey } from "../../redux/states/user";
import { PrivateRoutes, PublicRoutes } from "../../models/routes";
import { getCachedUser } from "../../services/auth.service";
import { Roles } from "../../models/roles";

const userPromise = getCachedUser();

const mockUserData = {
  id: 2,
  name: "Morty Smith",
  status: "Alive" as const,
  species: "Human",
  type: "",
  gender: "Male" as const,
  origin: { name: "unknown", url: "" },
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/3",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  episode: ["https://rickandmortyapi.com/api/episode/1"],
  url: "https://rickandmortyapi.com/api/character/2",
  created: "2017-11-04T18:50:21.651Z",
};

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = use(userPromise);
  //const userData = mockUserData;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      console.log("Username:", username);
      console.log("Password:", password);
      console.log("Login successful", userData);
      dispatch(createUser({ ...userData, role: Roles.ADMIN }));
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  }, [username, password, userData, dispatch, navigate]);

  const handleUsernameChange = useCallback((value: string) => {
    setUsername(value);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  return (
    <div>
      <Login
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default LoginContainer;
