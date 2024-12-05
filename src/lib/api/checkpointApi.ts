import axios from "axios";
import { LoginState } from "../interface";

export class HrisApiService {
  private hrisApi;
  private baseUrl = process.env.NEXT_PUBLIC_HRIS_API_BASE_URL;

  constructor(accessToken?: string | undefined) {
    this.hrisApi = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  public getEmployeeClockIns() {
    return this.hrisApi.get("/api/human-resource/clock-ins");
  }

  public authLogin(data: LoginState) {
    return this.hrisApi.post("/api/auth/login", {
      email: data.email,
      password: data.password,
    });
  }
}
