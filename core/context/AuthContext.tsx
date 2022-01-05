import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
  ReactNode,
  useMemo,
} from "react";
import {
  createUserWithEmailAndPassword,
  User,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { auth, firestore } from "@utils/firebase";

interface IAuthContext {
  currentUser: any;
  signInWithEmailAndPass: any;
  createUserWithEmailAndPass: any;
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

  const [isAuthenticated, setIsAuthenicated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>();

  const router = useRouter();

  const createUserWithEmailAndPass = useCallback(
    async (email: string, password: string, password_check: string) => {
      try {
        setIsLoading(true);
        if (password !== password_check) {
          setError("Please check your credentials!");
          console.log(error);
        } else {
          setPersistence(auth, browserSessionPersistence).then(async () => {
            await createUserWithEmailAndPassword(auth, email, password).then(
              async (credentials) => {
                const user = credentials.user;

                if (user) {
                  setCurrentUser(user);
                  setIsAuthenicated(true);

                  if (password !== password_check) {
                    setError("Please check again your credentials!");
                  } else {
                    await setDoc(
                      doc(firestore, "users", user.uid),
                      {
                        _id: user.uid,
                        email: user.email,
                        displayName: user.email.slice(
                          0,
                          user.email.indexOf("@")
                        ),
                      },
                      { merge: true }
                    )
                      .then(() => {
                        setIsLoading(false);
                        router.push("/");
                      })
                      .catch((e) => console.log(e));
                  }
                }
                if (error && !user) {
                  console.error(error);
                  router.push("/auth/signin");
                }
              }
            );
          });
        }
      } catch (e) {
        setError(e);
        // TODO: remove this and do a proper error handling
        console.log(error);
        if (error) {
          router.push("/auth/signin");
        }
      }
    },
    [error, router]
  );

  const signInWithEmailAndPass = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);
        await signInWithEmailAndPassword(auth, email, password).then(
          async (credentials) => {
            const user = credentials.user;
            if (user) {
              const docRef = doc(firestore, "users", user.uid);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                setCurrentUser(user);
                setIsAuthenicated(true);
                setIsLoading(false);
                router.push("/");
              } else {
                setError("Unable to login, check your credentials!");
                router.push("/auth/signin");
              }
            }
          }
        );
      } catch (e) {
        // TODO: remove this and do a proper error handling
        setError("Unable to login, check your credentials!");
      }
    },
    [router]
  );

  const logOut = useCallback(() => {
    signOut(auth).then(() => {
      setCurrentUser(null);
      setIsAuthenicated(false);
      router.push("/");
    });
  }, [router]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenicated(true);
        setCurrentUser(user);
      }
    });
  }, [currentUser, isAuthenticated]);

  const memovedValue = useMemo(
    () => ({
      currentUser,
      signInWithEmailAndPass,
      createUserWithEmailAndPass,
      isLoading,
      error,
      isAuthenticated,
      logOut,
    }),
    [
      currentUser,
      signInWithEmailAndPass,
      createUserWithEmailAndPass,
      isLoading,
      error,
      isAuthenticated,
      logOut,
    ]
  );

  return (
    <AuthContext.Provider value={memovedValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
