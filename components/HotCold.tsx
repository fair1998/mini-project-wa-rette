import React, { FunctionComponent } from "react";

interface HotColdProps {
  type: "hot" | "cold";
}

const HotCold: FunctionComponent<HotColdProps> = (props) => {
  const { children, type } = props;
  return (
    <div className={`relative hotcold ${type === "hot" ? "w-190" : "w-200"}`}>
      <div
        className={`absolute bg-hotcold-${
          type === "hot" ? "hot w-188" : "cold w-198"
        }`}
      />
      <div className="absolute side-hotcold" />
      <div className="absolute bg-side-hotcold" />
      <div className="absolute -top-44 left-1 icon-hotcold">
        {type === "hot" ? (
          <img src="fire.svg" alt="fire" />
        ) : (
          <img src="snowflake.svg" alt="snowflake" />
        )}
      </div>
      <div className="absolute -top-43 left-50 connect">
        <div className="title-3">{type === "hot" ? "HOT" : "COLD"}</div>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
};

export default HotCold;
