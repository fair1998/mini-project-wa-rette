import { FunctionComponent } from "react";
import BlockNumber from "./BlockNumber";
const ColorNumber = require("../components/data/ColorNumber.json");

const LastSpin: FunctionComponent = (props) => {

  const allSetNumber = [];

  const numberSet = ColorNumber.map((val: any, i: number) => {
    return (
      <BlockNumber key={i} color={val.color} size="sm" className="mr-1">
        {val.number}
      </BlockNumber>
    );
  });

  for (let i = 0; i < 8; i++) {
    allSetNumber.push(
      <div key={i} className="flex flex-row z-20">
        {numberSet}
      </div>
    );
  }
  return (
    <div className="relative mb-20">
      <img className="absolute" src="Rectangle.png" alt="Rectangle" />
      <img
        className="absolute z-30"
        style={{ left: 192, top: 2, transform: "rotate(30deg)" }}
        src="/ticker.svg"
        alt="ticker"
      />
      <img
        className="absolute z-40"
        style={{ left: 170, top: 36, transform: "rotate(-152deg)" }}
        src="/ticker.svg"
        alt="ticker"
      />
      <div
        className="absolute rounded z-10 title-3"
        style={{ top: -9, left: 8 }}
      >
        Last Spin
      </div>

      <div className="absolute bg-scroll" style={{ top: 9, left: 7 }}>
        <div className="scroll" id="scroll">
          {allSetNumber}
        </div>
      </div>
    </div>
  );
};

export default LastSpin;
