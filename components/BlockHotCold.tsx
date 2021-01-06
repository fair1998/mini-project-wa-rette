import React, { FunctionComponent, useEffect, useState } from "react";
import BlockNumber from "./BlockNumber";
import HotCold from "./HotCold";

interface IProps {
  data: any;
  beadlength: number;
}

const BlockHotCold: FunctionComponent<IProps> = (props) => {
  const { data, beadlength } = props;

  if (data) {
    data.sort(function (a, b) {
      return b.sum - a.sum;
    });
  }

  console.log("data", data);
  const hot = data.slice(0, beadlength <= 5 ? beadlength : 5);
  const cold = data.slice(
    data.length <= 10 ? 5 : data.length - 5,
    data.length <= 10 ? 10 : data.length
  );

  return (
    <div className="flex flex-row gap-4">
      <HotCold type="hot">
        <div className="flex flex-row gap-1">
          {beadlength
            ? hot.map((val: any, i: number) => (
                <BlockNumber key={i} size="xs" color={val.color}>
                  {val.number}
                </BlockNumber>
              ))
            : ""}
        </div>
      </HotCold>
      <HotCold type="cold">
        <div className="flex flex-row gap-1">
          {beadlength
            ? cold.map((val: any, i: number) => (
                <BlockNumber key={i} size="xs" color={val.color}>
                  {val.number}
                </BlockNumber>
              ))
            : ""}
        </div>
      </HotCold>
    </div>
  );
};

export default BlockHotCold;
