import { FunctionComponent } from "react";

const BalckSquare: FunctionComponent = (props) => {
  const { children } = props;
  return (
    <div className="relative max-w-466 w-full h-339">
      <div className="absolute w-full block-square" />
      <div className="absolute w-455 top-0 left-0 block-square-sub" />
      {children}
    </div>
  );
};

export default BalckSquare;
