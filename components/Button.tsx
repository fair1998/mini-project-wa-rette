import { FunctionComponent } from "react";

interface IProps {
  type: "white" | "green" | "yellow" | "red";
  width: Number;
  onClick?: () => void;
}

const Button: FunctionComponent<IProps> = (props) => {
  const { children, type, width, onClick } = props;
  return (
    <div
      style={{ width: `${width + "px"}` }}
      className={`wrapper-btn${"-" + type}`}
    >
      <button className={`btn${"-" + type}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
