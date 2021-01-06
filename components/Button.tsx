import { FunctionComponent } from "react";

interface ButtonProps {
  color: "white" | "green" | "yellow" | "red";
  width: Number;
  onClick?: () => void;
}

const Button: FunctionComponent<ButtonProps> = (props) => {
  const { children, color, width, onClick } = props;
  return (
    <div
      style={{ width: `${width + "px"}` }}
      className={`wrapper-btn${"-" + color}`}
    >
      <button className={`btn${"-" + color}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
