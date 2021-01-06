import { GetServerSidePropsContext } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { ACCESS_TOKEN } from "./cookie";
import Axios from "axios";

export interface IUser {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
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

    if (guestOnly && cookies[ACCESS_TOKEN]) {
      throw new Error("GuestOnly");
    }

    if (allowGuest) {
      return null;
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
    if (status === 200) {
      return user;
    }

    throw new Error("Unauthorized");
  } catch (error) {
    if (
      !error.message?.match(/GuestOnly|Unauthorized/) &&
      error.response?.statusText !== "Unauthorized"
    ) {
      console.log("[ERROR]", error.message);
      console.log(error);
    }

    if (error.message === "GuestOnly") {
      ctx.res.statusCode = 307;
      ctx.res.setHeader("Location", ctx.query.forward || "/");
      return null;
    }

    destroyCookie(ctx, ACCESS_TOKEN);

    if (req.url?.match(/^(\/){0,1}login/)) {
      return null;
    }

    const forward = req.url || "/";
    ctx.res.statusCode = 307;
    ctx.res.setHeader("Location", `/login?forward=${forward}`);
    return null;
  }
}
