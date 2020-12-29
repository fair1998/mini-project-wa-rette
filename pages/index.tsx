import { NextPage } from "next";
import React, { useState } from "react";
import BalckSquare from "../components/BalckSquare";
import Button from "../components/Button";
import DefaultLayout from "../components/layout/DefaultLayout";
import HotCold from "../components/HotCold";
import BlockNumber from "../components/BlockNumber";
import BeadRoad from "../components/BeadRoad";
import MiniGame from "../components/MiniGame";
import LastSpin from "../components/LastSpin";
import { useRouter } from "next/dist/client/router";
const colorBlock = require("../components/data/colorBlock.json");

const IndexPage: NextPage = () => {
  console.log("IndexPage");
  const router = useRouter();
  // const [result, setResult] = useState<number>();
  const [rolling, setRolling] = useState<boolean>(false);
  const [arr, setArr] = useState<any>([]);
  const spinTime = 5;
  async function roll() {
    if (rolling === false) {
      setRolling(true);
      const scroll = document.getElementById("scroll");
      const sum = Math.floor(Math.random() * (18 + 1));
      let col = null;
      for (let index = 0; index < colorBlock.length; index++) {
        if (sum === colorBlock[index].number) {
          col = colorBlock[index].color;
          break;
        }
      }

      scroll.style.transition = "margin " + spinTime + "s ease";
      scroll.style.marginLeft =
        "calc(180px - 20px - (760px * 6) - (40px * " + sum + "))";

      await setTimeout(function () {
        scroll.style.transition = "margin 0s ease";
        scroll.style.marginLeft =
          "calc(180px - 20px - (760px * 1) - (40px * " + sum + "))";
        setRolling(false);
      }, spinTime * 1000);
      arr.push({ number: sum, color: col });
    }
  }

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
          </BalckSquare>
          <div className="max-w-430 w-full pl-10 pt-5">
            <LastSpin colorBlock={colorBlock} />
            <MiniGame />
          </div>
        </div>
        <div className="footer-game">
          <div className="flex items-center">
            <Button
              onClick={() => {
                router.push({ pathname: "/login" });
              }}
              type="red"
              width={64}
            >
              Exit
            </Button>
            <div className="title-0 ml-5">Roberto Capuchino</div>
          </div>
          <div className="flex gap-x-2.5 items-center">
            <Button
              onClick={() => {
                router.push({ pathname: "/history" });
              }}
              type="white"
              width={106}
            >
              Bet Detail
            </Button>
            <Button type="green" width={76}>
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

export default IndexPage;
