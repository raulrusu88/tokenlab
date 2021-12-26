import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../Buttons/Button";
import { Logo } from "./Logo";

export const Navigation = () => {
  const { loginWithPopup, user, isLoading } = useAuth0();

  const handleSignup = async () => {
    loginWithPopup();

    const data = {
      auth0_id: user.sub.replace("|", " ").split(" ")[1],
    };

    // TODO: Move eveyrthing that is server/fetch related into a utils file and just call it from there.
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
    return res.json();
  };

  return (
    <nav className="w-full h-16 flex items-center text-text">
      <div className="grid grid-cols-3 grid-rows-none w-full">
        <div />
        <div className="flex items-center justify-center flex-row">
          <Logo />
        </div>
        <div className="flex justify-center flex-row">
          <Button text="Sign Up" onClick={handleSignup} />
          <Button text="Log In" />
        </div>
      </div>
    </nav>
  );
};
