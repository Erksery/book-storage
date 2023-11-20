import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [cookies] = useCookies(["AuthDataCookie"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (cookies.AuthDataCookie != null || undefined) {
      setIsAuthenticated(true);
    } else setIsAuthenticated(false);

    console.log(isAuthenticated);
  }, [cookies.AuthDataCookie]);
  return isAuthenticated;
};
