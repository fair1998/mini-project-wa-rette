import { GetServerSideProps, NextPage } from "next";
import withAuthentication from "../components/constant/withAuthentication";
import React, { useEffect, useState } from "react";
import BlockSquare from "../components/BlockSquare";
import Button from "../components/Button";
import DefaultLayout from "../components/layout/DefaultLayout";
import BeadRoad from "../components/BeadRoad";
import BoardGame from "../components/BoardGame";
import LastSpin from "../components/LastSpin";
import { useRouter } from "next/dist/client/router";
import Axios from "axios";
import { ACCESS_TOKEN } from "../components/constant/cookie";
import { parseCookies } from "nookies";
import HistoryDetail from "../components/HistoryDetail";
import BlockHotCold from "../components/BlockHotCold";
import Loading from "../components/Loading";
const ColorNumber = require("../components/data/ColorNumber.json");

interface IndexPageProps {
  username: string;
}

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const { username } = props;
  const router = useRouter();

  const [chipHistory, setChipHistory] = useState<any>([[]]);
  const [rolling, setRolling] = useState<boolean>(false);
  const [beadResults, setBeadResults] = useState<any>([]);
  const [betKeysAPI, setBetKeysAPI] = useState<any>([]);
  const [finalBet, setFinalBet] = useState<[]>([]);
  const [beadCount, setBeadCount] = useState<any>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const lastIndex = chipHistory.length - 1;
  const currentChip = chipHistory[lastIndex];

  async function spin() {
    if (chipHistory.length > 1) {
      if (rolling === false) {
        setRolling(true);

        const { data } = await Axios.get(
          "https://roulette.ap.ngrok.io/roulette/result",
          {
            headers: {
              Authorization: "Bearer " + parseCookies()[ACCESS_TOKEN],
            },
          }
        );

        const newBetKeysAPI = [];
        newBetKeysAPI.push(data.winner);
        data.addition.map((val: string) => {
          newBetKeysAPI.push(val);
        });

        const scroll = document.getElementById("scroll");
        const winner: string = data.winner.substring(11);
        let colorBlockNumber = null;

        for (let i = 0; i < ColorNumber.length; i++) {
          if (winner === ColorNumber[i].number) {
            colorBlockNumber = ColorNumber[i].color;
            break;
          }
        }

        const newBeadCount = beadCount.slice();
        const numberIndex = newBeadCount.findIndex((val) => {
          return val.number === winner;
        });
        newBeadCount[numberIndex].count = beadCount[numberIndex].count + 1;

        scroll.style.transition = "margin 5s ease";
        scroll.style.marginLeft =
          "calc(180px - 20px - (760px * 6) - (40px * " + winner + "))";

        await setTimeout(() => {
          scroll.style.transition = "margin 0s ease";
          scroll.style.marginLeft =
            "calc(180px - 20px - (760px * 1) - (40px * " + winner + "))";

          setBeadResults(
            beadResults.concat([{ number: winner, color: colorBlockNumber }])
          );

          setBeadCount(newBeadCount);
          setBetKeysAPI(newBetKeysAPI);
          setRolling(false);
          setFinalBet(currentChip);
          setChipHistory([[]]);
          showHistoryDetail();
        }, 5 * 1000);
      }
    }
  }

  const placeChip = (val: string, i: number) => {
    const chip = currentChip.slice();
    chip[i] = val;
    setChipHistory(chipHistory.concat([chip]));
  };

  const undo = () => {
    if (lastIndex > 0) {
      const newHistory = chipHistory.slice(0, lastIndex);
      setChipHistory(newHistory);
    }
  };

  const showHistoryDetail = () => {
    setShowHistory(true);
  };

  const hideHistory = () => {
    setShowHistory(false);
  };

  useEffect(() => {
    const newBeadCount = [
      { number: "0", color: "green", count: 0 },
      { number: "1", color: "red", count: 0 },
      { number: "2", color: "black", count: 0 },
      { number: "3", color: "red", count: 0 },
      { number: "4", color: "black", count: 0 },
      { number: "5", color: "red", count: 0 },
      { number: "6", color: "black", count: 0 },
      { number: "7", color: "red", count: 0 },
      { number: "8", color: "black", count: 0 },
      { number: "9", color: "red", count: 0 },
      { number: "10", color: "black", count: 0 },
      { number: "11", color: "black", count: 0 },
      { number: "12", color: "red", count: 0 },
      { number: "13", color: "black", count: 0 },
      { number: "14", color: "red", count: 0 },
      { number: "15", color: "black", count: 0 },
      { number: "16", color: "red", count: 0 },
      { number: "17", color: "black", count: 0 },
      { number: "18", color: "red", count: 0 },
    ];
    setBeadCount(newBeadCount);
  }, []);

  return (
    <DefaultLayout>
      <Loading />
      <div className="wrapper-game lg:transform lg:rotate-90 lg:p-0 lg:absolute lg:top-0 lg:bottom-0  lg:right-0">
        <div className="flex flex-row">
          <BlockSquare>
            <img
              className="absolute top-6 left-5"
              src="logoWaRette.svg"
              alt="logoWaRette"
            />
            <div className="absolute top-20 left-5">
              <BlockHotCold
                beadCount={beadCount}
                beadAmount={beadResults.length}
              />
              <div className="mt-4 title-3">BEAD ROAD</div>
              <BeadRoad data={beadResults} />
            </div>
          </BlockSquare>
          <div className="max-w-430 w-full pl-10 pt-5">
            <LastSpin />
            <BoardGame
              chip={currentChip}
              rolling={rolling}
              onClick={(val, i) => placeChip(val, i)}
            />
          </div>
        </div>
        <div className="footer-game">
          <div className="flex items-center">
            <Button
              onClick={() => {
                router.push({ pathname: "/logout" });
              }}
              color="red"
              width={64}
            >
              Exit
            </Button>
            <div className="title-0 ml-5">{username}</div>
          </div>
          <div className="flex gap-x-2.5 items-center">
            <Button onClick={showHistoryDetail} color="white" width={106}>
              Bet Detail
            </Button>

            <Button onClick={undo} color="green" width={76}>
              Undo
            </Button>
            <Button onClick={spin} color="yellow" width={150}>
              Spin
            </Button>
          </div>
        </div>
      </div>
      <HistoryDetail
        showHistory={showHistory}
        hideHistory={hideHistory}
        betKeysAPI={betKeysAPI}
        finalBet={finalBet}
      />
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = withAuthentication(ctx);
  const username = (await res).username;
  return {
    props: { username },
  };
};

export default IndexPage;
