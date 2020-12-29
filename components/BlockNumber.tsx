import { FunctionComponent } from "react";

interface IProps {
  color: "red" | "blue" | "black" | "green" | "null";
  size: "xs" | "sm" | "md";
}

const BlockNumber: FunctionComponent<IProps> = (props) => {
  const { children, color, size } = props;
  return (
    <div
      className={`block-number box-shadow-black-16 ${
        color === "red"
          ? "bg-red"
          : color === "black"
          ? "bg-blue-300"
          : color === "blue"
          ? "bg-blue"
          : color === "green"
          ? "bg-green"
          : "border-dotted-white-30 bg-blue-700"
      } ${size === "sm" ? "w-10 h-30" : size === "md" ? "" : ""}`}
    >
      {children}
    </div>
  );
};

export default BlockNumber;
