import { FunctionComponent } from "react";

const DefaultLayout: FunctionComponent = (props) => {
  const { children } = props;
  return <div className="h-screen  ">{children}</div>;
};

export default DefaultLayout;
