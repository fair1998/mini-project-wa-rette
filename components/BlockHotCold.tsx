import React, { FunctionComponent } from "react";
import BlockNumber from "./BlockNumber";
import HotCold from "./HotCold";

interface IProps {
  data: any;
}

const BlockHotCold: FunctionComponent<IProps> = (props) => {
  const { data } = props;

  data.sort(function (a, b) {
    return b.sum - a.sum;
  });

  const hot = data.slice(0, 5);
  const cold = data.slice(
    data.length <= 10 ? 5 : data.length - 5,
    data.length <= 10 ? 10 : data.length
  );

  return (
    <div className="flex flex-row gap-4">
      <HotCold type="hot">
        <div className="flex flex-row gap-1">
          {hot.map((val: any, i: number) => (
            <BlockNumber key={i} size="xs" color={val.color}>
              {val.number}
            </BlockNumber>
          ))}
        </div>
      </HotCold>
      <HotCold type="cold">
        <div className="flex flex-row gap-1">
          {cold.map((val: any, i: number) => (
            <BlockNumber key={i} size="xs" color={val.color}>
              {val.number}
            </BlockNumber>
          ))}
        </div>
      </HotCold>
    </div>
  );
};

export default BlockHotCold;
