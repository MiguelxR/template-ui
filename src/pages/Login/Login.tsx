import Button from "../../components/Button/Button";

interface LoginProps {
  username: string;
  password: string;
  handleUsernameChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  handleLogin: () => void;
}

const Login = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
}: LoginProps) => {
  return (
    <div>
      <div>Hola este es el login</div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => handleUsernameChange(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
      />
      <Button textButton="Iniciar sesión" handleClick={handleLogin} />
    </div>
  );
};

export default Login;
