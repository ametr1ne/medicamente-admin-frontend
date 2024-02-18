import { IAuthResponse, ITokens } from "@/types/auth.type";
import Cookies from "js-cookie";

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set("accessToken", data.accessToken);
  Cookies.set("refreshToken", data.refreshToken);
};
export const clearStorage = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("medicamenteuser");
};
export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  Cookies.set("medicamenteuser", JSON.stringify(data.user));
};
