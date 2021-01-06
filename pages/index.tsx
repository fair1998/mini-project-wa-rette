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
const colorBlock = require("../components/data/colorBlock.json");

interface IndexPageProps {
  username: string;
}

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const { username } = props;
  const router = useRouter();

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [history, setHistory] = useState<any>([[]]);
  const [rolling, setRolling] = useState<boolean>(false);
  const [bead, setBead] = useState<any>([]);
  const [beadSum, setBeadSum] = useState<any>([]);
  const [betDetail, setBetDetail] = useState<any>([]);
  const [finalBet, setFinalBet] = useState<[]>([]);

  const lastIndex = history.length - 1;
  const current = history[lastIndex];

  async function spin() {
    if (history.length > 1) {
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

        const newBetDetail = [];
        newBetDetail.push(data.winner);
        data.addition.map((v: any) => {
          newBetDetail.push(v);
        });

        const scroll = document.getElementById("scroll");
        const winner = data.winner.substring(11);
        let colorbut = null;

        for (let i = 0; i < colorBlock.length; i++) {
          if (winner === colorBlock[i].number) {
            colorbut = colorBlock[i].color;
            break;
          }
        }

        const newBeadSum = beadSum.slice();
        const plusSum = newBeadSum.findIndex((val) => {
          return val.number === winner;
        });

        scroll.style.transition = "margin 5s ease";
        scroll.style.marginLeft =
          "calc(180px - 20px - (760px * 6) - (40px * " + winner + "))";

        await setTimeout(function () {
          scroll.style.transition = "margin 0s ease";
          scroll.style.marginLeft =
            "calc(180px - 20px - (760px * 1) - (40px * " + winner + "))";

          setBead(bead.concat({ number: winner, color: colorbut }));

          if (plusSum >= 0) {
            newBeadSum[plusSum].sum = beadSum[plusSum].sum + 1;
            setBeadSum(newBeadSum);
          }

          setBetDetail(newBetDetail);
          setRolling(false);
          setFinalBet(current);
          setHistory([[]]);
          show();
        }, 5 * 1000);
      }
    }
  }

  const handleClick = (i: number, val: string) => {
    const chip = current.slice();
    chip[i] = val;
    setHistory(history.concat([chip]));
  };

  const undo = () => {
    if (lastIndex > 0) {
      const newHistory = history.slice(0, lastIndex);
      setHistory(newHistory);
    }
  };

  const show = () => {
    setShowDetail(true);
  };

  const hide = () => {
    setShowDetail(false);
  };

  useEffect(() => {
    const butNumbet = [
      { number: "0", color: "green", sum: 0 },
      { number: "1", color: "red", sum: 0 },
      { number: "2", color: "black", sum: 0 },
      { number: "3", color: "red", sum: 0 },
      { number: "4", color: "black", sum: 0 },
      { number: "5", color: "red", sum: 0 },
      { number: "6", color: "black", sum: 0 },
      { number: "7", color: "red", sum: 0 },
      { number: "8", color: "black", sum: 0 },
      { number: "9", color: "red", sum: 0 },
      { number: "10", color: "black", sum: 0 },
      { number: "11", color: "black", sum: 0 },
      { number: "12", color: "red", sum: 0 },
      { number: "13", color: "black", sum: 0 },
      { number: "14", color: "red", sum: 0 },
      { number: "15", color: "black", sum: 0 },
      { number: "16", color: "red", sum: 0 },
      { number: "17", color: "black", sum: 0 },
      { number: "18", color: "red", sum: 0 },
    ];
    setBeadSum(butNumbet);
  }, []);

  return (
    <DefaultLayout>
      <Loading />
      <div className="wrapper-game">
        <div className="flex flex-row">
          <BlockSquare>
            <img
              className="absolute top-6 left-5"
              src="logoWaRette.svg"
              alt="logoWaRette"
            />
            <div className="absolute top-20 left-5">
              <BlockHotCold data={beadSum} beadlength={bead.length} />
              <div className="mt-4 title-3">BEAD ROAD</div>
              <BeadRoad data={bead} />
            </div>
          </BlockSquare>
          <div className="max-w-430 w-full pl-10 pt-5">
            <LastSpin />
            <BoardGame
              value={current}
              rolling={rolling}
              onClick={(i, val) => handleClick(i, val)}
            />
          </div>
        </div>
        <div className="footer-game">
          <div className="flex items-center">
            <Button
              onClick={() => {
                router.push({ pathname: "/logout" });
              }}
              type="red"
              width={64}
            >
              Exit
            </Button>
            <div className="title-0 ml-5">{username}</div>
          </div>
          <div className="flex gap-x-2.5 items-center">
            <Button onClick={show} type="white" width={106}>
              Bet Detail
            </Button>

            <Button onClick={undo} type="green" width={76}>
              Undo
            </Button>
            <Button onClick={spin} type="yellow" width={150}>
              Spin
            </Button>
          </div>
        </div>
      </div>
      <HistoryDetail
        show={showDetail}
        hide={hide}
        betDetail={betDetail}
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
