import { paths } from "@/lib/routes";
import { clearStorage } from "@/services/auth/auth.helper";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { push } = useRouter();

  const logout = () => {
    clearStorage();
    push(paths.LOGIN);
  };

  return { logout };
};
