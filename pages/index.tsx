import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import BlockSquare from "../components/BlockSquare";
import Button from "../components/Button";
import DefaultLayout from "../components/layout/DefaultLayout";
import HotCold from "../components/HotCold";
import BlockNumber from "../components/BlockNumber";
import BeadRoad from "../components/BeadRoad";
import BoardGame from "../components/BoardGame";
import LastSpin from "../components/LastSpin";
import { useRouter } from "next/dist/client/router";
import withAuthentication from "../components/constant/withAuthentication";
import Axios from "axios";
import { ACCESS_TOKEN } from "../components/constant/cookie";
import { parseCookies } from "nookies";
import HistoryDetail from "../components/HistoryDetail";
const colorBlock = require("../components/data/colorBlock.json");

interface IProps {
  // username: string;
}

const IndexPage: NextPage<IProps> = (props) => {
  // const { username } = props;
  const router = useRouter();

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [history, setHistory] = useState<any>([{ chip: [] }]);
  const [step, setStep] = useState<number>(0);
  const [rolling, setRolling] = useState<boolean>(false);
  const [bead, setBead] = useState<any>([]);
  const [detail, setDetail] = useState<any>([]);

  const current = history[step];
  // console.log("current", current);

  async function roll() {
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

      let newArr = [];
      newArr.push(data.winner);
      data.addition.map((v: any) => {
        newArr.push(v);
      });

      const scroll = document.getElementById("scroll");
      const award = data.winner.substring(11);
      let colorbut = null;

      for (let i = 0; i < colorBlock.length; i++) {
        if (award === colorBlock[i].number) {
          colorbut = colorBlock[i].color;
          break;
        }
      }

      scroll.style.transition = "margin 5s ease";
      scroll.style.marginLeft =
        "calc(180px - 20px - (760px * 6) - (40px * " + award + "))";

      await setTimeout(function () {
        scroll.style.transition = "margin 0s ease";
        scroll.style.marginLeft =
          "calc(180px - 20px - (760px * 1) - (40px * " + award + "))";

        setBead(bead.concat({ number: award, color: colorbut }));
        setDetail(newArr);
        setRolling(false);
        show();
      }, 5 * 1000);
    }
  }
  // console.log("history", history);
  const handleClick = (i: number, val: string) => {
    const newHistory = history.slice(0, step + 1);
    // console.log("newHistory", newHistory);

    const current = newHistory[newHistory.length - 1];
    // console.log("current", current);

    const chip = current.chip.slice();
    console.log("chip1", chip);

    chip[i] = val;
    // console.log("chip2", chip);

    setHistory(newHistory.concat([{ chip: chip }]));
    setStep(newHistory.length);
  };

  const undo = () => {
    if (step > 0) {
      const reverse = step - 1;
      setStep(reverse);
    }
  };

  const show = () => {
    setShowDetail(true);
  };

  const hide = () => {
    setShowDetail(false);
  };

  return (
    <DefaultLayout>
      <div className="wrapper-game">
        <div className="flex flex-row">
          <BlockSquare>
            <img
              className="absolute top-6 left-5"
              src="logoWaRette.svg"
              alt="logoWaRette"
            />
            <div className="absolute top-20 left-5">
              <div className="flex flex-row gap-4">
                <HotCold type="hot">
                  <div className="flex flex-row gap-1">
                    <BlockNumber size="xs" color="red">
                      18
                    </BlockNumber>
                    <BlockNumber size="xs" color="black">
                      2
                    </BlockNumber>
                    <BlockNumber size="xs" color="black">
                      11
                    </BlockNumber>
                    <BlockNumber size="xs" color="black">
                      13
                    </BlockNumber>
                    <BlockNumber size="xs" color="red">
                      5
                    </BlockNumber>
                  </div>
                </HotCold>
                <HotCold type="cold">
                  <div className="flex flex-row gap-1">
                    <BlockNumber size="xs" color="red">
                      18
                    </BlockNumber>
                    <BlockNumber size="xs" color="black">
                      2
                    </BlockNumber>
                    <BlockNumber size="xs" color="black">
                      11
                    </BlockNumber>
                    <BlockNumber size="xs" color="black">
                      13
                    </BlockNumber>
                    <BlockNumber size="xs" color="red">
                      5
                    </BlockNumber>
                  </div>
                </HotCold>
              </div>
              <div className="mt-4 title-3">BEAD ROAD</div>
              <BeadRoad data={bead} />
            </div>
          </BlockSquare>
          <div className="max-w-430 w-full pl-10 pt-5">
            <LastSpin colorBlock={colorBlock} />
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
            {/* <div className="title-0 ml-5">{username}</div> */}
          </div>
          <div className="flex gap-x-2.5 items-center">
            <Button onClick={show} type="white" width={106}>
              Bet Detail
            </Button>

            <Button onClick={undo} type="green" width={76}>
              Undo
            </Button>
            <Button onClick={roll} type="yellow" width={150}>
              Spin
            </Button>
          </div>
        </div>
      </div>
      <HistoryDetail
        isShow={showDetail}
        hide={hide}
        detail={detail}
        chip={current}
      />
    </DefaultLayout>
  );
};

export const getidServerSeProps: GetServerSideProps = async (ctx) => {
  const res = withAuthentication(ctx);
  const username = (await res).username;
  return {
    props: { username },
  };
};

export default IndexPage;
