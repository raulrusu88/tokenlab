import { Button } from "../Buttons/Button";
import { Logo } from "./Logo";

export const Navigation = () => {
  return (
    <nav className="w-full h-16 flex items-center text-text">
      <div className="grid grid-cols-3 grid-rows-none w-full">
        <div />
        <div className="flex items-center justify-center flex-row">
          <Logo />
        </div>
        <div className="flex justify-center flex-row">
          <Button text="Sign Up" />
          <Button text="Log In" />
        </div>
      </div>
    </nav>
  );
};
