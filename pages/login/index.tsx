import { NextPage } from "next";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { useRouter } from "next/dist/client/router";
import Axios from "axios";
import Button from "../../components/Button";

// type LoginResponse = {
//   username: string;
//   password: string;
// };

const Login: NextPage = () => {
  const router = useRouter();
  console.log("Login");

  // function formSubmit<pformSubmit>() {
  //   let aa = "55";
  //   let bb = "56";
  //   if (aa === bb) {
  //     const res = Axios.post<LoginResponse>("/user", {
  //       username: "Fred",
  //       password: "Flintstone",
  //     })
  //       .then(function (response) {
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   } else {
  //     console.log("error");
  //   }
  // }

  return (
    <DefaultLayout>
      <div className="align-center h-screen">
        <div>
          <div className="title-1 mb-2">Login</div>
          <div className="title-2 mb-6">เข้าสู่ระบบ</div>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input-text"
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              name="password"
              placeholder="Password"
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
            <Button
              type="green"
              width={86}
              onClick={() => {
                router.push({ pathname: "/" });
              }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Login;
