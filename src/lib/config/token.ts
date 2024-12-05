import { setCookie, getCookie, deleteCookie } from "cookies-next";

type Timer = {
  maxAge: number;
  path: string;
};

export class TokenConfig {
  private setCookie;
  private getCookie;
  private deleteCookie;

  constructor() {
    this.setCookie = setCookie;
    this.getCookie = getCookie;
    this.deleteCookie = deleteCookie;
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

  public removeToken() {
    return this.deleteCookie("token");
  }
}
