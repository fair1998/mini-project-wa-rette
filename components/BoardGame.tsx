import React, { FunctionComponent } from "react";
import BlockNumber from "./BlockNumber";
const ChipPosition = require("./data/ChipPosition.json");

interface BoardGameProps {
  onClick: (val: string, i: number) => void;
  chip: any;
  rolling: boolean;
  betKeysAPI: any;
}

const boardBlockNumber = [
  {
    number: "0",
    value: "STRAIGHTUPx0",
    color: "green",
    className: "row-span-3 h-auto",
  },
  { number: "3", value: "STRAIGHTUPx3", color: "red", className: "" },
  { number: "6", value: "STRAIGHTUPx6", color: "black", className: "" },
  { number: "9", value: "STRAIGHTUPx9", color: "red", className: "" },
  { number: "12", value: "STRAIGHTUPx12", color: "red", className: "" },
  { number: "15", value: "STRAIGHTUPx15", color: "black", className: "" },
  { number: "18", value: "STRAIGHTUPx18", color: "red", className: "" },
  { number: "1:2", value: "COLUMNx3rd", color: "blue", className: "" },
  { number: "2", value: "STRAIGHTUPx2", color: "black", className: "" },
  { number: "5", value: "STRAIGHTUPx5", color: "red", className: "" },
  { number: "8", value: "STRAIGHTUPx8", color: "black", className: "" },
  { number: "11", value: "STRAIGHTUPx11", color: "black", className: "" },
  { number: "14", value: "STRAIGHTUPx14", color: "red", className: "" },
  { number: "17", value: "STRAIGHTUPx17", color: "black", className: "" },
  { number: "1:2", value: "COLUMNx2nd", color: "blue", className: "" },
  { number: "1", value: "STRAIGHTUPx1", color: "red", className: "" },
  { number: "4", value: "STRAIGHTUPx4", color: "black", className: "" },
  { number: "7", value: "STRAIGHTUPx7", color: "red", className: "" },
  { number: "10", value: "STRAIGHTUPx10", color: "black", className: "" },
  { number: "13", value: "STRAIGHTUPx13", color: "black", className: "" },
  { number: "16", value: "STRAIGHTUPx16", color: "red", className: "" },
  { number: "1:2", value: "COLUMNx1st", color: "blue", className: "" },
  { number: "", value: "", color: "null", className: "row-span-2" },
  {
    number: "1st",
    value: "DOZENx1st",
    color: "blue",
    className: "col-span-2 w-auto",
  },
  {
    number: "2nd",
    value: "DOZENx2nd",
    color: "blue",
    className: "col-span-2 w-auto",
  },
  {
    number: "3rd",
    value: "DOZENx3rd",
    color: "blue",
    className: "col-span-2 w-auto",
  },
  { number: "", value: "", color: "null", className: "row-span-2" },
  { number: "1-9", value: "HALFxSMALL", color: "blue", className: "" },
  { number: "Even", value: "HALFxEVEN", color: "blue", className: "" },
  { number: "", value: "HALFxRED", color: "red", className: "" },
  { number: "", value: "HALFxBLACK", color: "black", className: "" },
  { number: "Odd", value: "HALFxODD", color: "blue", className: "" },
  { number: "10-18", value: "HALFxBIG", color: "blue", className: "" },
];

const BoardGame: FunctionComponent<BoardGameProps> = (props) => {
  const { onClick, chip, rolling, betKeysAPI } = props;
  return (
    <div className="relative ">
      <div className="absolute grid grid-cols-8 gap-1 text-fs12 w-380">
        {boardBlockNumber.map((valueBlock: any, i: number) => {
          const check = betKeysAPI.find((valueAPI: string) => {
            return valueAPI === valueBlock.value;
          });
          return (
            <BlockNumber
              key={i}
              color={valueBlock.color}
              size="md"
              className={`${valueBlock.className} ${
                check && "border-white border-2"
              }`}
            >
              {valueBlock.number}
            </BlockNumber>
          );
        })}
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
