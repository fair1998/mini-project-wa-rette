import { NextPage } from "next";
import DefaultLayout from "../../components/layout/DefaultLayout";
import React from "react";
import Button from "../../components/Button";
import BalckSquare from "../../components/BalckSquare";
import { useRouter } from "next/dist/client/router";

const History: NextPage = () => {
  console.log("History");
  const router = useRouter();
  const results = [];

  for (let index = 0; index < 51; index++) {
    const res = Math.floor(Math.random() * 2);
    const element = (
      <div key={index} className="wrapper-result ">
        <div className={`result ${res ? "ck-result" : ""}`}>STRAIGHTUPx3</div>
      </div>
    );
    results.push(element);
  }

  return (
    <DefaultLayout>
      <div className="wrapper-game">
        <div className="flex flex-row">
          <BalckSquare>
            <div className="absolute left-5 top-5 title-3">Bet keys</div>
            <div
              id="scrollbar"
              className="absolute left-5 top-50 w-314 h-260 grid grid-cols-2 gap-x-10 gap-y-6 overflow-y-auto pr-5"
            >
              {results}
            </div>
          </BalckSquare>
          <div className="max-w-430 w-full pl-10 pt-5">
            <div className="left-5 top-5 title-3 mb-2.5">Player Bet keys</div>
            <div
              id="scrollbar"
              className="w-314 h-260 grid grid-cols-2 gap-x-10 gap-y-6 overflow-y-auto pr-5"
            >
              {results}
            </div>
          </div>
        </div>
        <div className="footer-game">
          <div className="flex items-center">
            <Button
              onClick={() => {
                router.push({ pathname: "/" });
              }}
              type="white"
              width={140}
            >
              Back
            </Button>
            <div className="title-0 ml-5">Bet Detail</div>
          </div>
          <div>
            <img src="/logoWaRette.svg" alt="logoWaRette" />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default History;
