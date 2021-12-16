import { FunctionComponent, ReactNode } from "react";
import { Navigation } from "../components/Navigation/Navigation";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <Navigation />
      <main>{children}</main>
    </div>
  );
};
