import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Usar vi.hoisted para crear mocks que se ejecuten antes de cualquier importación
const {
  mockClearLocalStorage,
  mockDispatch,
  mockNavigate,
  mockResetUser,
  mockCreateUser,
} = vi.hoisted(() => {
  return {
    mockClearLocalStorage: vi.fn(),
    mockDispatch: vi.fn(),
    mockNavigate: vi.fn(),
    mockResetUser: vi.fn(),
    mockCreateUser: vi.fn(),
  };
});

// Mock de todas las dependencias externas
// Nota: Ya no necesitamos mockear getCachedUser para el render, pero lo mantenemos por si se llama en el scope del módulo.
vi.mock("../../../services/auth.service", () => ({
  getCachedUser: vi.fn(),
}));
vi.mock("../../../helpers/localStorage.helper", () => ({
  clearLocalStorage: mockClearLocalStorage,
}));
vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));
vi.mock("../../../redux/states/user", () => ({
  resetUser: mockResetUser,
  createUser: mockCreateUser,
  UserKey: "user",
}));
vi.mock("../../../models/routes", () => ({
  PublicRoutes: { LOGIN: "login" },
  PrivateRoutes: { PRIVATE: "private" },
}));
vi.mock("../../../models/roles", () => ({
  Roles: { ADMIN: "ADMIN" },
}));

// Mock del componente hijo `Login` para simplificar el test
vi.mock("../../../pages/Login/Login", () => ({
  default: ({
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
  }: {
    username: string;
    password: string;
    handleUsernameChange: (value: string) => void;
    handlePasswordChange: (value: string) => void;
    handleLogin: () => void;
  }) => (
    <div>
      <h1>Mocked Login Component</h1>
      <input
        aria-label="username"
        value={username}
        onChange={(e) => handleUsernameChange(e.target.value)}
      />
      <input
        aria-label="password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  ),
}));

// Importar el componente a testear DESPUÉS de todos los mocks
import LoginContainer from "../../../pages/Login/LoginContainer";

describe("LoginContainer Unit Tests (Synchronous)", () => {
  beforeEach(() => {
    // Limpia los contadores de llamadas antes de cada test.
    vi.clearAllMocks();
    mockResetUser.mockReturnValue({ type: "user/resetUser" });
    mockCreateUser.mockImplementation((user) => ({
      type: "user/createUser",
      payload: user,
    }));
  });

  it("should render the login form immediately", () => {
    render(<LoginContainer />);

    // El componente ahora se renderiza de forma síncrona, no se necesita `await`
    expect(screen.getByText("Mocked Login Component")).toBeInTheDocument();
    expect(screen.getByLabelText("username")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should call initialization effects on mount", () => {
    render(<LoginContainer />);

    // Verifica que las funciones del useEffect se hayan llamado
    expect(mockClearLocalStorage).toHaveBeenCalledWith("user");
    expect(mockDispatch).toHaveBeenCalledWith(mockResetUser());
    expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });

  it("should update state when user types in inputs", async () => {
    const user = userEvent.setup();
    render(<LoginContainer />);

    const usernameInput = screen.getByLabelText("username");
    const passwordInput = screen.getByLabelText("password");

    // Simula la escritura del usuario
    await user.type(usernameInput, "testuser");
    await user.type(passwordInput, "password123");

    // Verifica que el valor de los inputs se haya actualizado
    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("password123");
  });

  it("should dispatch createUser and navigate on login button click", async () => {
    const user = userEvent.setup();
    render(<LoginContainer />);

    const loginButton = screen.getByRole("button", { name: /login/i });
    await user.click(loginButton);

    // Verifica que la acción de crear usuario se haya despachado.
    // Como los datos están hardcodeados en el componente, el mock de `createUser`
    // recibirá un payload con `id: 2` y `name: "Morty Smith"`.
    expect(mockCreateUser).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 2,
        name: "Morty Smith",
        role: "ADMIN",
      })
    );
    expect(mockDispatch).toHaveBeenCalled();

    // Verifica que se haya navegado a la ruta privada
    expect(mockNavigate).toHaveBeenCalledWith("/private", { replace: true });
  });
});
