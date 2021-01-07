import { FunctionComponent } from "react";

interface BlockNumberProps {
  color: "red" | "blue" | "black" | "green" | "dotted " | "null";
  size: "xs" | "sm" | "md";
  className?: string;
}

const BlockNumber: FunctionComponent<BlockNumberProps> = (props) => {
  const { children, color, size, className } = props;
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
          : color === "dotted "
          ? "border-dotted-white-30 bg-blue-700"
          : "border-none box-shadow-none"
      } ${
        size === "xs"
          ? "w-5 h-4"
          : size === "sm"
          ? "w-10 h-30 rounded text-fs12 font-bold"
          : "w-11 h-9 rounded text-fs12 font-bold"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default BlockNumber;
