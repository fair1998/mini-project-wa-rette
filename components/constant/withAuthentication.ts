import { GetServerSidePropsContext } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { ACCESS_TOKEN } from "./cookie";
import Axios from "axios";

export interface IUser {
  uid: string;
  username: string;
  iat: string;
  exp: string;
}

interface WithAuthenticationOptions {
  allowGuest?: boolean;
  guestOnly?: boolean;
}

const defaultOptions: WithAuthenticationOptions = {
  allowGuest: false,
  guestOnly: false,
};

export default async function withAuthentication(
  ctx: GetServerSidePropsContext,
  options = defaultOptions
) {
  const { req } = ctx;
  const { allowGuest, guestOnly } = options;
  try {
    const cookies = parseCookies(ctx);

    if (cookies[ACCESS_TOKEN] && guestOnly) {
      throw new Error("GuestOnly");
    }

    if (allowGuest) {
      return;
    }

    if (!cookies[ACCESS_TOKEN]) {
      throw new Error("Unauthorized");
    }
    const { data: user, status } = await Axios.get<IUser>(
      "https://roulette.ap.ngrok.io/me",
      {
        headers: {
          Authorization: "Bearer " + cookies[ACCESS_TOKEN],
        },
      }
    );
    console.log("user", user);
    console.log("status", status);
    if (status === 200) {
      return user;
    }

    throw new Error("Unauthorized");
  } catch (error) {
    if (error.message === "Unauthorized" || error.response?.status === 401) {
      destroyCookie(ctx, ACCESS_TOKEN);
      if (req.url?.match(/^(\/){0,1}login/)) {
        return;
      }
      
      destroyCookie(ctx, ACCESS_TOKEN);

      const forward = req.url || "/";
      ctx.res.statusCode = 307;
      ctx.res.setHeader("Location", `/login?forward=${forward}`);
      return;
    }

    if (error.message === "GuestOnly") {
      ctx.res.statusCode = 307;
      ctx.res.setHeader("Location", ctx.query.forward || "/");
      return;
    }

    throw error;
  }
}
