import { setCookie, getCookie } from "cookies-next";

export class RoleConfig {
  private setCookie;
  private getCookie;

  constructor() {
    this.setCookie = setCookie;
    this.getCookie = getCookie;
  }
  public setRole(role: string) {
    return this.setCookie("role", role);
  }

  public getRole() {
    return this.getCookie("role");
  }
}
