import { FunctionComponent } from "react";

const LastSpin: FunctionComponent = (props) => {
  const dataSetNumber = [];

  for (let i = 0; i < 8; i++) {
    const numberSet  = (
      <div key={i} className="flex flex-row z-20">
        <div className="btn-gmae bg-green w-10 h-30">0</div>
        <div className="btn-gmae bg-red w-10 h-30">1</div>
        <div className="btn-gmae bg-blue-300 w-10 h-30">2</div>
        <div className="btn-gmae bg-red w-10 h-30">3</div>
        <div className="btn-gmae bg-blue-300 w-10 h-30">4</div>
        <div className="btn-gmae bg-red w-10 h-30">5</div>
        <div className="btn-gmae bg-blue-300 w-10 h-30">6</div>
        <div className="btn-gmae bg-red w-10 h-30">7</div>
        <div className="btn-gmae bg-blue-300 w-10 h-30">8</div>
        <div className="btn-gmae bg-red w-10 h-30">9</div>
        <div className="btn-gmae bg-blue-300 w-10 h-30">10</div>
        <div className="btn-gmae bg-blue-300 w-10 h-30">11</div>
        <div className="btn-gmae bg-red w-10 h-30">12</div>
        <div className="btn-gmae bg-blue-300 w-10 h-30">13</div>
        <div className="btn-gmae bg-red w-10 h-30">14</div>
        <div className="btn-gmae bg-blue-300 w-10 h-30">15</div>
        <div className="btn-gmae bg-red w-10 h-30">16</div>
        <div className="btn-gmae bg-blue-300 w-10 h-30">17</div>
        <div className="btn-gmae bg-red w-10 h-30">18</div>
      </div>
    );
    dataSetNumber.push(numberSet );
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
        Last Spsin
      </div>

      <div className="absolute bg-scroll" style={{ top: 9, left: 7 }}>
        <div className="scroll" id="scroll">
          {dataSetNumber}
        </div>
      </div>
    </div>
  );
};

export default LastSpin;
