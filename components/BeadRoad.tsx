import React, { FunctionComponent } from "react";
import BlockNumber from "./BlockNumber";

interface BeadRoadProps {
  data: any;
}

const BeadRoad: FunctionComponent<BeadRoadProps> = (props) => {
  const { data } = props;

  return (
    <div id="scrollbar" className="overflow-x-auto w-330">
      <div className="p-1 grid grid-rows-6 grid-flow-col gap-0.5 w-min">
        {data &&
          data.map((val: any, i: number) => (
            <BlockNumber key={i} size="xs" color={val.color}>
              {val.number}
            </BlockNumber>
          ))}
        <BlockNumber size="xs" color="dotted " />
      </div>
    </div>
  );
};

export default BeadRoad;
