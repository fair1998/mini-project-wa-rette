import { NextPage } from "next";
import React from "react";
import PageLoader from "../components/PageLoader";
import Logout from "./logout";

const Loader: NextPage = () => {
  return (
    <div className="">
      <PageLoader />
    </div>
  );
};

export default Loader;
