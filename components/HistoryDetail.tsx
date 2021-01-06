import React, { FunctionComponent } from "react";
import BlockSquare from "./BlockSquare";
import Button from "./Button";

interface IProps {
  show: any;
  hide: () => void;
  betDetail: any;
  finalBet: [];
}

const HistoryDetail: FunctionComponent<IProps> = (props) => {
  const { show, hide, betDetail, finalBet } = props;

  const results = [];

  finalBet.map((valFinalBet: any, i: number) => {
    const check = betDetail.find((valDetail: string) => {
      return valDetail === valFinalBet;
    });

    if (check) {
      results.push(
        <div key={i} className="wrapper-result ">
          <div className="result ck-result">{valFinalBet}</div>
        </div>
      );
    } else {
      results.push(
        <div key={i} className="wrapper-result ">
          <div className="result">{valFinalBet}</div>
        </div>
      );
    }
  });
  return (
    <div
      className="bg-main_image bg-blue"
      style={{
        display: show ? "block" : "none",
        zIndex: 100,
        width: 896,
        height: 414,
        position: "absolute",
        top: "1.250em",
        left: "50%",
        transform: "translate(-50%)",
      }}
    >
      <div className="flex flex-row">
        <BlockSquare>
          <div className="absolute left-5 top-5 title-3">Bet keys</div>
          <div
            id="scrollbar"
            className="absolute left-5 top-50 w-340 h-260 grid grid-cols-2 auto-rows-min gap-x-10 gap-y-6 overflow-y-auto pr-5"
          >
            {betDetail.map((val: string, i: number) => (
              <div key={i} className="wrapper-result ">
                <div className="result">{val}</div>
              </div>
            ))}
          </div>
        </BlockSquare>

        <div className="max-w-430 w-full pl-10 pt-5">
          <div className="left-5 top-5 title-3 mb-2.5">Player Bet keys</div>
          <div
            id="scrollbar"
            className="w-340 h-260 grid grid-cols-2 auto-rows-min gap-x-10 gap-y-6 overflow-y-auto pr-5"
          >
            {results}
          </div>
        </div>
      </div>
      <div className="footer-game">
        <div className="flex items-center">
          <Button onClick={hide} type="white" width={140}>
            Back
          </Button>
          <div className="title-0 ml-5">Bet Detail</div>
        </div>
        <div>
          <img src="/logoWaRette.svg" alt="logoWaRette" />
        </div>
      </div>
    </div>
  );
};

export default HistoryDetail;
