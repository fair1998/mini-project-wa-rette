import { NextPage } from "next";
import React from "react";
import BalckSquare from "../components/BalckSquare";
import Button from "../components/Button";
import DefaultLayout from "../components/layout/DefaultLayout";
import styled from "styled-components";
import Flame from "../components/Flame";

const BuleMain = styled.div`
  position: relative;
  border-top: 48px solid #020e43;
  border-right: 15px solid transparent;
  width: 190px;
  filter: drop-shadow(3px 3px 1px rgba(0, 0, 0, 0.16));
`;

const RedMain = styled.div`
  position: absolute;
  width: 188px;
  top: -47px;
  left: 1px;
  border-top: 46px solid #f63c1f;
  border-right: 15px solid transparent;
`;

const YellowMain = styled.div`
  position: absolute;
  border-top: 46px solid #020e43;
  border-right: 10px solid transparent;
  width: 29px;
  top: -46px;
  left: 0px;
`;

const YellowSub = styled.div`
  position: absolute;
  border-top: 46px solid #fde232;
  border-right: 10px solid transparent;
  width: 28px;
  top: -46px;
  left: 0px;
`;

const SVGMain = styled.div`
  position: absolute;
  top: -43px;
  left: 3px;
`;

const IndexPage: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="wrapper-game">
        <div className="flex flex-row">
          <BalckSquare>
            <img
              className="absolute top-6 left-5"
              src="logoWaRette.svg"
              alt="logoWaRette"
            />
            <div className="absolute top-20 left-5">
              <div className="flex flex-row">
                <BuleMain>
                  <RedMain>
                    <YellowMain>
                      <YellowSub>
                        <SVGMain>
                          <Flame />
                        </SVGMain>
                      </YellowSub>
                    </YellowMain>
                  </RedMain>
                </BuleMain>
                <div>222</div>
              </div>
            </div>
          </BalckSquare>
          <div className="max-w-430 w-full pl-10 pt-5">
            <div className="left-5 top-5 text-3 mb-2.5">Player Bet keys</div>
            <div
              id="scrollbar"
              className="w-314 h-260 grid grid-cols-2 gap-x-10 gap-y-6 overflow-y-auto pr-5"
            ></div>
          </div>
        </div>
        <div className="footer-game">
          <div className="flex items-center">
            <Button type="red" width={64}>
              Exit
            </Button>
            <div className="title-0 ml-5">Roberto Capuchino</div>
          </div>
          <div className="flex gap-x-2.5 items-center">
            <Button type="white" width={106}>
              Bet Detail
            </Button>
            <Button type="green" width={76}>
              Undo
            </Button>
            <Button type="yellow" width={150}>
              Spin
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;
