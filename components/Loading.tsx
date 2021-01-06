import { FunctionComponent, useEffect, useState } from "react";

const Loading: FunctionComponent = (props) => {
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(0);

  const Loading = () => {
    if (width >= 99) {
      setLoading(false);
    } else {
      setWidth(width + 1);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(Loading, 20);
    if (width > 99) {
      clearTimeout(timeOut);
    }
  }, [Loading]);

  return (
    <div
      className={`flex fixed top-0 left-0 right-0 justify-center text-center flex-col min-w-max min-h-screen z-50 bg-loading  transition-all duration-700 ${
        loading === true ? "visible opacity-100 " : "invisible opacity-0 "
      }`}
    >
      <div className="text-center mx-auto ">
        <img src="/logoWaRette.png" alt="logoWaRette" />
        <p className="mt-8 text-white mb-2">Loading...</p>
      </div>
      <div className="rounded-xl bg-loadingOutside w-10/12 h-6 mx-auto ">
        <div
          style={{ width: `${width}%` }}
          className="rounded-xl m-1 h-4 bg-gradient-to-b from-progressTop to-progressBottom transition-all ease-out "
        />
      </div>
    </div>
  );
};

export default Loading;
