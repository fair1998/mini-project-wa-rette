import { GetServerSideProps, NextPage } from "next";
import { destroyCookie } from "nookies";
import { ACCESS_TOKEN } from "../../components/constant/cookie";

const Logout: NextPage = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  destroyCookie(ctx, ACCESS_TOKEN);
  ctx.res.statusCode = 307;
  ctx.res.setHeader("Location", `/login`);
  return {
    props: {},
  };
};

export default Logout;
