import React from "react";
import Link from "next/link";
import { Button } from "@components/Buttons/Button";
import { Logo } from "./Logo";
import { useAuth } from "@context/AuthContext";

export const Navigation = () => {
  const { isAuthenticated, logOut } = useAuth();

  return (
    <nav className="w-full h-16 flex items-center text-text">
      <div className="grid grid-cols-3 grid-rows-none w-full">
        <div />
        <div className="flex items-center justify-center flex-row">
          <Link href="/" passHref>
            <a className="w-max flex items-center">
              <Logo />
            </a>
          </Link>
        </div>
        <div className="flex justify-center flex-row">
          {isAuthenticated ? (
            <>
              <Button text="Dashboard" href="/dashboard" />
              <Button text="Log out" onClick={logOut} />
            </>
          ) : (
            <>
              <Button text="Sign In" href="/auth/signin" />
              <Button text="Sign Up" href="/auth/signup" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
