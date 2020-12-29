import React, { FunctionComponent } from "react";
import BlockNumber from "./BlockNumber";

interface IProps {
  data: any;
}

const BeadRoad: FunctionComponent<IProps> = (props) => {
  const { data } = props;

  return (
    <div id="scrollbar" className="overflow-x-auto w-330">
      <div className="p-1 grid grid-rows-6 grid-flow-col gap-0.5 w-min">
        {data &&
          data.map((pop: any, i: number) => (
            <BlockNumber size="xs" key={i} color={pop.color}>
              {pop.number}
            </BlockNumber>
          ))}
        <BlockNumber size="xs" color="null" />
      </div>
    </div>
  );
};

export default BeadRoad;
