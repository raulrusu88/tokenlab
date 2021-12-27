import React from "react";
import { Button } from "../Buttons/Button";
import { Logo } from "./Logo";
import { useAuth } from "../../context/AuthContext";

export const Navigation = () => {
  const { signInWithPopup, currentUser, isAuthenticated, logOut } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) console.log(currentUser);
    else "not logged in";
  }, [currentUser, isAuthenticated]);

  return (
    <nav className="w-full h-16 flex items-center text-text">
      <div className="grid grid-cols-3 grid-rows-none w-full">
        <div />
        <div className="flex items-center justify-center flex-row">
          <Logo />
        </div>
        <div className="flex justify-center flex-row">
          {isAuthenticated ? (
            <Button text="Log out" onClick={logOut} />
          ) : (
            <>
              <Button text="Sign In" onClick={signInWithPopup} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
