import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
  ReactNode,
} from "react";
import { useUser } from "@auth0/nextjs-auth0";

interface IAuthContext {
  user?: any;
  loading: boolean;
  error?: any;
  login: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return <></>;
};
