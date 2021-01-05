import { GetServerSideProps, NextPage } from "next";
import DefaultLayout from "../../components/layout/DefaultLayout";
import React from "react";
import Button from "../../components/Button";
import BlockSquare from "../../components/BlockSquare";
import { useRouter } from "next/dist/client/router";
import withAuthentication from "../../components/constant/withAuthentication";

interface IProps {
  // router: any;
}

const History: NextPage<IProps> = (props) => {
  console.log("History");
  const router = useRouter();
  const results = [];

  for (let index = 0; index < 51; index++) {
    const check = Math.floor(Math.random() * 2);
    const element = (
      <div key={index} className="wrapper-result ">
        {/* <div className={`result ${check && "ck-result"}`}>REDx3</div> */}
        <div className={`result "}`}>REDx3</div>
      </div>
    );
    results.push(element);
  }

  // const url: any = router.query.data;
  // console.log(JSON.parse(url));

  return (
    <DefaultLayout>
      <div className="wrapper-game">
        <div className="flex flex-row">
          <BlockSquare>
            <div className="absolute left-5 top-5 title-3">Bet keys</div>
            <div
              id="scrollbar"
              className="absolute left-5 top-50 w-314 h-260 grid grid-cols-2 gap-x-10 gap-y-6 overflow-y-auto pr-5"
            >
              {results}
            </div>
          </BlockSquare>

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  withAuthentication(ctx);
  return {
    props: {},
  };
};

export default History;
