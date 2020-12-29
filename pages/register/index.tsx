import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Axios from "axios";
import { useState } from "react";
import Button from "../../components/Button";

// type LoginResponse = {
//   username: string;
//   password: string;
//   repassword: string;
// };

const Register: NextPage = () => {
  console.log("Register");
  const router = useRouter();

  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [repassword, setRepassword] = useState<String>("");
  // console.log("username", username);
  // console.log("Register", password);
  // console.log("repassword", repassword);
  const formSubmit = async () => {
    if (password === repassword) {
      await Axios.post("https://roulette.ap.ngrok.io/users", {
        username: username,
        password: password,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("error");
    }
  };

  return (
    <DefaultLayout>
      <div className="align-center h-screen">
        <div>
          <div className="title-1 mb-2">Register</div>
          <div className="title-2 mb-6">ลงทะเบียน</div>

          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="input-text"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="input-password"
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              name="repassword"
              placeholder="Re Password"
              onChange={(e) => setRepassword(e.target.value)}
              className="input-password"
            />
          </div>

          <Button onClick={formSubmit} type="yellow" width={272}>
            Sign up
          </Button>

          <div className="text-center mt-5">
            <a className="text-a">
              Already have an account,
              <span
                onClick={() => {
                  router.push({ hostname: "/login" });
                }}
                className="text-yellow"
              >
                Sign in
              </span>
            </a>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Register;
