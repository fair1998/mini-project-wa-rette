import React, { FunctionComponent } from "react";
import BlockNumber from "./BlockNumber";
const ChipPosition = require("./data/ChipPosition.json");

interface BoardGameProps {
  onClick: (val: string, i: number) => void;
  chip: any;
  rolling: boolean;
}

const BoardGame: FunctionComponent<BoardGameProps> = (props) => {
  const { onClick, chip, rolling } = props;
  return (
    <div className="relative ">
      <div className="absolute grid grid-cols-8 gap-1 text-fs12 w-380">
        <BlockNumber
          color="green"
          size="md"
          className="btn-gmae row-span-3 h-auto"
        >
          0
        </BlockNumber>
        <BlockNumber color="red" size="md">
          3
        </BlockNumber>
        <BlockNumber color="black" size="md">
          6
        </BlockNumber>
        <BlockNumber color="red" size="md">
          9
        </BlockNumber>
        <BlockNumber color="red" size="md">
          12
        </BlockNumber>
        <BlockNumber color="black" size="md">
          15
        </BlockNumber>
        <BlockNumber color="red" size="md">
          18
        </BlockNumber>
        <BlockNumber color="blue" size="md">
          1:2
        </BlockNumber>
        <BlockNumber color="black" size="md">
          2
        </BlockNumber>
        <BlockNumber color="red" size="md">
          5
        </BlockNumber>
        <BlockNumber color="black" size="md">
          8
        </BlockNumber>
        <BlockNumber color="black" size="md">
          11
        </BlockNumber>
        <BlockNumber color="red" size="md">
          14
        </BlockNumber>
        <BlockNumber color="black" size="md">
          17
        </BlockNumber>
        <BlockNumber color="blue" size="md">
          1:2
        </BlockNumber>
        <BlockNumber color="red" size="md">
          1
        </BlockNumber>
        <BlockNumber color="black" size="md">
          4
        </BlockNumber>
        <BlockNumber color="red" size="md">
          7
        </BlockNumber>
        <BlockNumber color="black" size="md">
          10
        </BlockNumber>
        <BlockNumber color="black" size="md">
          13
        </BlockNumber>
        <BlockNumber color="red" size="md">
          16
        </BlockNumber>
        <BlockNumber color="blue" size="md">
          1:2
        </BlockNumber>
        <div className="row-span-2" />
        <BlockNumber color="blue" size="md" className="col-span-2 w-auto">
          1st
        </BlockNumber>
        <BlockNumber color="blue" size="md" className="col-span-2 w-auto">
          2nd
        </BlockNumber>
        <BlockNumber color="blue" size="md" className="col-span-2 w-auto">
          3rd
        </BlockNumber>
        <div className="row-span-2" />
        <BlockNumber color="blue" size="md">
          1-9
        </BlockNumber>
        <BlockNumber color="blue" size="md">
          Even
        </BlockNumber>
        <BlockNumber color="red" size="md" />
        <BlockNumber color="black" size="md" />
        <BlockNumber color="blue" size="md">
          Odd
        </BlockNumber>
        <BlockNumber color="blue" size="md">
          10-18
        </BlockNumber>
      </div>

      {ChipPosition.map((val: any, i: number) => (
        <button
          key={i}
          className="absolute  align-center z-20"
          style={val.position}
          onClick={() => onClick(val.value, i)}
          disabled={chip[i] || rolling ? true : false}
        >
          {chip[i] && (
            <img className="z-40" width={18} src="/Chip.svg" alt="Chip" />
          )}
        </button>
      ))}
    </div>
  );
};

export default BoardGame;
