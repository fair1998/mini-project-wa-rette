import { https, http, FollowResponse } from "follow-redirects";
import { ClientRequest, IncomingMessage } from "http";
import { RequestOptions } from "https";
import JsonParser from "./json-parser";
import nookies from "nookies";
import router from "next/router";
import { ACCESS_TOKEN } from "./cookie";

interface IRequestOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, any>;
  data?: Record<string, any>;
}

interface IResponse<T = any> {
  status: number;
  response: T;
}

export const request = function <ResponseData = any>(
  opts: IRequestOptions
): Promise<IResponse<ResponseData>> {
  const cookies = nookies.get(null);

  if (!opts.headers) opts.headers = {};

  if (!opts.headers["Content-Type"]) {
    opts.headers["Content-Type"] = "application/json";
  }

  if (cookies[ACCESS_TOKEN] && !opts.headers["Authorization"]) {
    opts.headers["Authorization"] = "Bearer " + cookies[ACCESS_TOKEN];
  }

  if (process.browser) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.onload = function () {
        const response = JsonParser.tryParse(this.response) || this.response;
        const status = this.status;

        if (status >= 200 && status <= 299) {
          resolve({ status, response });
        } else if (status === 401) {
          reject({ status, response });
        } else {
          reject({ status, response });
        }
      };

      req.onerror = function () {
        reject(JsonParser.tryParse(this.response) || this.response);
      };

      req.open(opts.method || "GET", opts.url);
      for (const [header, value] of Object.entries(opts.headers || {})) {
        req.setRequestHeader(header, value);
      }
      req.send(JsonParser.tryStringify(opts.data) || opts.data);
    });
  }

  return new Promise((resolve, reject) => {
    opts.url += "/";
    opts.url.replace(/\/\/$/, "/");
    if (!opts.url.match(/^http(s){0,1}:\/\/.+\/$/i)) {
      opts.url = "http://localhost:" + process.env.SERVER_PORT + opts.url;
    }
    const url = new URL(opts.url);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      port: url.port,
      method: opts.method,
      headers: opts.headers,
      maxRedirects: 20,
    };
    const req = url.protocol.match(/^https:/)
      ? https.request(options, handler)
      : http.request(options, handler);
    req.write(JsonParser.tryStringify(opts.data));
    req.end();
    function handler(res: IncomingMessage & FollowResponse) {
      const chunks: Uint8Array[] = [];
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
      res.on("end", function () {
        const buffer = Buffer.concat(chunks);
        const response = JsonParser.tryParse<any>(buffer.toString("utf-8"));
        resolve({ status: res.statusCode || 0, response });
      });
      res.on("error", function (error) {
        reject(error);
      });
    }
  });
};

export const fetcher = async (url: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const cookies = nookies.get();
  if (cookies[ACCESS_TOKEN]) {
    headers["Authorization"] = `Bearer ${cookies[ACCESS_TOKEN]}`;
  }
  const response = await fetch(url, {
    headers,
  });
  return await response.json();
};
