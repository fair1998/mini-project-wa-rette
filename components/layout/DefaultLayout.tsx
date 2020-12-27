import { FunctionComponent } from "react";

const DefaultLayout: FunctionComponent = (props) => {
  const { children } = props;
  return (
    <div className="font-prompt bg-main_image bg-blue h-screen">{children}</div>
  );
};

export default DefaultLayout;
