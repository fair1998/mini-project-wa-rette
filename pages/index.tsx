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
const colorBlock = require("../components/data/colorBlock.json");

interface IProps {
  username: string;
}

const IndexPage: NextPage<IProps> = (props) => {
  // console.log("IndexPage");
  const { username } = props;
  const router = useRouter();

  const [history, setHistory] = useState<any>([{ chip: [] }]);
  // const [history, setHistory] = useState<any>({ chip: [] });
  const [step, setStep] = useState<number>(0);

  const [rolling, setRolling] = useState<boolean>(false);
  const [arr, setArr] = useState<any>([]);
  const [detail, setDetail] = useState<any>({});

  async function roll() {
    if (rolling === false) {
      setRolling(true);

      Axios.get("https://roulette.ap.ngrok.io/roulette/result", {
        headers: {
          Authorization: "Bearer " + parseCookies()[ACCESS_TOKEN],
        },
      })
        .then(function (response) {
          // console.log(response);
          setDetail(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      const arr = []
      for (let v of history.chip) {
        if (v) {
          arr.push(v)
        }
      }
      const scroll = document.getElementById("scroll");
      const award = detail.winner.substring(11);
      let col = null;

      for (let index = 0; index < colorBlock.length; index++) {
        if (award === colorBlock[index].number) {
          col = colorBlock[index].color;
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
        let copyArr = arr;
        copyArr.push({ number: award, color: col });
        setArr(copyArr);
        setRolling(false);
      }, 5 * 1000);
    }
  }

  const current = history[step];
  // console.log(current) 
  // console.log('history', history)

  const handleClick = (i: number, val: string) => {
    const newHistory = history.slice(0, step + 1);
    // console.log('newHistory', newHistory)

    const current = newHistory[newHistory.length - 1];
    // console.log('current', current)

    const chip = current.chip.slice();
    // console.log('chip', chip)

    chip[i] = val;
    // console.log('chip2', chip)

    setHistory(
      newHistory.concat([
        {
          chip: chip,
        },
      ])
    );
    // console.log('history', history)
    setStep(newHistory.length);
  };
  // const handleClick = (i: number, val: string) => {
  //   const chip = history.chip;
  //   chip[i] = val;
  //   setHistory({ chip: chip });
  //   console.log(val)
  // };
  // console.log('step', step)
  const undo = () => {
    if (step > 0) {
      const reverse = step - 1;
      setStep(reverse);
    }

  };
  // const undo = () => {
  //   const newArr = { chip: [] };
  //   setHistory(newArr);
  // };

  useEffect(() => {
    Axios.get("https://roulette.ap.ngrok.io/roulette/result", {
      headers: {
        Authorization: "Bearer " + parseCookies()[ACCESS_TOKEN],
      },
    })
      .then(function (response) {
        setDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
              <BeadRoad data={arr} />
            </div>
          </BlockSquare>
          <div className="max-w-430 w-full pl-10 pt-5">
            <LastSpin colorBlock={colorBlock} />
            {/* <BoardGame value={history} onClick={(i, val) => handleClick(i, val)} /> */}
            <BoardGame value={current} onClick={(i, val) => handleClick(i, val)} />
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
            <Button
              onClick={() => {
                router.push({
                  pathname: "/history",
                  // query: { data: JSON.stringify(detail) },
                });
              }}
              type="white"
              width={106}
            >
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
