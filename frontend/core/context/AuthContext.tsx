import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { useAuth0, User } from "@auth0/auth0-react";

interface IAuthContext {
  currentUser: any;
  signInWithPopup: any;
  isAuthenticated: boolean;
  logOut: any;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User>(null);

  const {
    loginWithRedirect,
    user,
    isLoading,
    error,
    isAuthenticated,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  // TODO: Change this to signin with redirect, i believe it is a better user experience
  const signInWithPopup = useCallback(async () => {
    try {
      await loginWithRedirect();

      const token = await getAccessTokenSilently();

      console.log(token);

      const data = {
        auth0_id: user.sub.replace("|", " ").split(" ")[1],
      };

      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      if (res) {
        setCurrentUser(user);

        return res.json();
      }
    } catch (e) {
      // TODO: remove this and do a proper error handling
      console.log(error);
    }
  }, [error, loginWithRedirect, user, isLoading]);

  const logOut = useCallback(() => {
    logout();
    setCurrentUser(null);
  }, [logout, setCurrentUser]);

  useEffect(() => {
    // Check if the user already is logged in, if so, it will silent login
    if (isAuthenticated) {
      setCurrentUser(user);
    }
  }, [isAuthenticated, user]);

  const memovedValue = useMemo(
    () => ({
      currentUser,
      signInWithPopup,
      isAuthenticated,
      logOut,
    }),
    [currentUser, signInWithPopup, isAuthenticated, logOut]
  );

  return (
    <AuthContext.Provider value={memovedValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
