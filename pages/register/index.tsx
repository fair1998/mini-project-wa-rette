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
  const router = useRouter();

  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [repassword, setRepassword] = useState<String>("");

  const formSubmit = async () => {
    if (password === repassword) {
      Axios.post("https://roulette.ap.ngrok.io/users", {
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
      <div className="wrapper-form">
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

          <Button type="yellow" width={272}>
            Sign up
          </Button>

          <div className="text-center mt-5">
            <a
              className="text-a"
              onClick={() => {
                router.push({ pathname: "/login" });
              }}
            >
              Already have an account,
              <span className="text-yellow"> Sign in</span>
            </a>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Register;
