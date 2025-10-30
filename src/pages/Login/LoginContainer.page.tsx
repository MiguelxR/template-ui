import { useCallback, useEffect, useState } from "react";
import Login from "./Login.page";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearLocalStorage } from "../../helpers/localStorage.helper";
import { createUser, resetUser, UserKey } from "../../redux/states/user";
import { PrivateRoutes, PublicRoutes } from "../../models/routes";
import { getCachedUser } from "../../services/auth.service";
import { Roles } from "../../models/roles";

// Eliminamos el userPromise global para usarlo en el efecto

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const abortControllerRef = useState<AbortController | null>(null);

  useEffect(() => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
    return () => {
      // Cancelar petición si existe al desmontar
      if (abortControllerRef[0]) {
        abortControllerRef[0].abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = useCallback(async () => {
    // Cancelar petición anterior si existe
    if (abortControllerRef[0]) {
      abortControllerRef[0].abort();
    }
    const controller = new AbortController();
    abortControllerRef[1](controller);
    try {
      console.log("Username:", username);
      console.log("Password:", password);
      const data = await getCachedUser(controller.signal);
      dispatch(createUser({ ...data, role: Roles.ADMIN }));
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
    } catch (error) {
      if (
        error instanceof Error &&
        (error.name === "CanceledError" || error.name === "AbortError")
      ) {
        console.log("Petición cancelada");
      } else {
        console.error("Login failed:", error);
      }
    }
  }, [username, password, dispatch, navigate]);

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
