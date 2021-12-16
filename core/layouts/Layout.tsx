import { FunctionComponent, ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-primary">
      <div className="w-10 bg-red-500">{children}</div>
    </div>
  );
};
