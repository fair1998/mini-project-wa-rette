import { GetServerSideProps, NextPage } from "next";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { useRouter } from "next/dist/client/router";
import Axios from "axios";
import Button from "../../components/Button";
import { useState } from "react";
import { setCookie } from "nookies";
import { ACCESS_TOKEN } from "../../components/constant/cookie";
import withAuthentication from "../../components/constant/withAuthentication";
import Loading from "../../components/Loading";

type LoginResponse = {
  accessToken: string;
};

const Login: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const formSubmit = async () => {
    await Axios.post<LoginResponse>("https://roulette.ap.ngrok.io/auth/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        setCookie(null, ACCESS_TOKEN, response.data.accessToken, {
          path: "/",
          expires: null,
        });
        window.location.reload();
      })
      .catch((error) => {
        // console.log("error.response.data.message", error.response.data.message);
        alert("Wrong username or password");
      });
  };
  return (
    <DefaultLayout>
      <Loading />
      <div className="align-center h-screen">
        <div>
          <div className="title-1 mb-2">Login</div>
          <div className="title-2 mb-6">เข้าสู่ระบบ</div>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="input-text"
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="input-password"
            />
          </div>
          <div className="align-between">
            <a
              className="text-a"
              onClick={() => {
                router.push({ pathname: "/register" });
              }}
            >
              Register
            </a>
            <Button color="green" width={86} onClick={formSubmit}>
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await withAuthentication(ctx, { guestOnly: true });
  return {
    props: {},
  };
};

export default Login;
