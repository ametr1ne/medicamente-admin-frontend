import { IUser } from "./user.type";

export interface ITokens {
    accessToken: string;
    refreshToken: string
}

export interface IAuthResponse extends ITokens {
    user: IUser
}