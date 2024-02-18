import { IAuthResponse } from "@/types/auth.type";
import { IUser, TLoginForm } from "@/types/user.type";
import { host, protectedHost } from "../index";
import { clearStorage, saveToStorage } from "./auth.helper";

export const authService = {
  async login(body: TLoginForm) {
    try {
      const { data } = await host.post<IAuthResponse>(`/auth/login`, body);

      if (data.accessToken) {
        saveToStorage(data);
      }

      return data;
    } catch (e) {
      throw e;
    }
  },

  async getUser() {
    try {
      const { data } = await protectedHost.get<IUser>(`/user/profile`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },

  async getNewTokens(body: { refreshToken: string }) {
    try {
      const { data } = await protectedHost.post<IAuthResponse>(`/auth/login/access-token`, body);

      if (data.accessToken) {
        saveToStorage(data);
      } else {
        clearStorage();
      }

      return data;
    } catch (e) {
      console.error(e);
    }
  },
};
