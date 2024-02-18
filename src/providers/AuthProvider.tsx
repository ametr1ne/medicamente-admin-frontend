import { authService } from "@/services/auth/auth.service";
import { IUser } from "@/types/user.type";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

export interface IAuthContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

const defaultState = {
  user: null,
  setUser: () => {},
} as IAuthContext;

export const AuthContext = createContext<IAuthContext>(defaultState);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(defaultState.user);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await authService.getUser();

      if (user) {
        setUser(user);
      }
    };

    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
