interface ButtonProps {
  textButton: string;
  handleClick: () => void;
}

const Button = ({ textButton, handleClick }: ButtonProps) => {
  return <button onClick={handleClick}>{textButton}</button>;
};

export default Button;
