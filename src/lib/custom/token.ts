import { setCookie, getCookie } from "cookies-next";

type Timer = {
  maxAge: number;
  path: string;
};

export class TokenConfig {
  private setCookie;
  private getCookie;

  constructor() {
    this.setCookie = setCookie;
    this.getCookie = getCookie;
  }

  public setToken(token: string, timer: Timer) {
    return this.setCookie("token", token, {
      maxAge: timer.maxAge,
      path: timer.path,
    });
  }

  public getToken() {
    return this.getCookie("token");
  }
}
