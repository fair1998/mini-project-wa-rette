import { FunctionComponent } from "react";
const actionBut = require("./data/actionBut.json");


interface IProps {
  onClick: (p: number, i: string) => void;
  value: any;
}

const BoardGame: FunctionComponent<IProps> = (props) => {
  const { onClick, value } = props;

  return (
    <div className="relative ">
      <div className="absolute grid grid-cols-8 gap-1 text-fs12 w-380">
        <div className="btn-gmae row-span-3 h-auto bg-green">0</div>
        <div className="btn-gmae bg-red">3</div>
        <div className="btn-gmae bg-blue-300">6</div>
        <div className="btn-gmae bg-red">9</div>
        <div className="btn-gmae bg-red">12</div>
        <div className="btn-gmae bg-blue-300">15</div>
        <div className="btn-gmae bg-red">18</div>
        <div className="btn-gmae bg-blue">1:2</div>
        <div className="btn-gmae bg-blue-300">2</div>
        <div className="btn-gmae bg-red">5</div>
        <div className="btn-gmae bg-blue-300">8</div>
        <div className="btn-gmae bg-blue-300">11</div>
        <div className="btn-gmae bg-red">14</div>
        <div className="btn-gmae bg-blue-300">17</div>
        <div className="btn-gmae bg-blue">1:2</div>
        <div className="btn-gmae bg-red">1</div>
        <div className="btn-gmae bg-blue-300">4</div>
        <div className="btn-gmae bg-red">7</div>
        <div className="btn-gmae bg-blue-300">10</div>
        <div className="btn-gmae bg-blue-300">13</div>
        <div className="btn-gmae bg-red">16</div>
        <div className="btn-gmae bg-blue">1:2</div>
        <div className="row-span-2" />
        <div className="btn-gmae col-span-2 w-auto bg-blue">1st</div>
        <div className="btn-gmae col-span-2 w-auto bg-blue">2nd</div>
        <div className="btn-gmae col-span-2 w-auto bg-blue">3rd</div>
        <div className="row-span-2" />
        <div className="btn-gmae bg-blue">1-9</div>
        <div className="btn-gmae bg-blue">Even</div>
        <div className="btn-gmae bg-red"></div>
        <div className="btn-gmae bg-blue-300"></div>
        <div className="btn-gmae bg-blue">Odd</div>
        <div className="btn-gmae bg-blue">10-18</div>
      </div>

      {actionBut.map((val: any, i: number) => (

        <button
          key={i}
          id={val.value}
          className="absolute align-center z-20"
          style={{
            top: val.but.top,
            left: val.but.left,
            width: val.but.width,
            height: val.but.height,
          }}
          onClick={() => onClick(i, val.value)}
        > 
        
        {value.chip[i] && (
          <img className="z-40" width={18} src="/Chip.svg" alt="Chip" />
        )}
        
        </button>
      ))}
    </div>
  );
};

export default BoardGame;