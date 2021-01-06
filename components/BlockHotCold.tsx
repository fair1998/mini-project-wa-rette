import React, { FunctionComponent, useEffect, useState } from "react";
import BlockNumber from "./BlockNumber";
import HotCold from "./HotCold";

interface BlockHotColdProps {
  beadCount: any;
  beadAmount: number;
}

const BlockHotCold: FunctionComponent<BlockHotColdProps> = (props) => {
  const { beadCount, beadAmount } = props;

  if (beadCount) {
    beadCount.sort(function (a, b) {
      return b.count - a.count;
    }); // Sort from highest to lowest.
  }

  const spinBeadMax = [];
  for (let i = 0; i < beadCount.length; i++) {
    if (beadCount[i].count >= 1) {
      spinBeadMax.push({
        number: beadCount[i].number,
        color: beadCount[i].color,
      });
    }
  }

  const hotSort = spinBeadMax.slice(0, 5);
  const coldSort = beadCount.slice(14, 19);
  
  return (
    <div className="flex flex-row gap-4">
      <HotCold type="hot">
        <div className="flex flex-row gap-1">
          {beadAmount
            ? hotSort.map((val: any, i: number) => (
                <BlockNumber key={i} size="xs" color={val.color}>
                  {val.number}
                </BlockNumber>
              ))
            : ""}
        </div>
      </HotCold>
      <HotCold type="cold">
        <div className="flex flex-row gap-1">
          {beadAmount
            ? coldSort.map((val: any, i: number) => (
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
