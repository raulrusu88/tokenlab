import { MouseEventHandler } from "react";
import Link from "next/link";

interface IButton {
  text: string;
  href?: string;
  onClick?: () => void;
}

export const Button = (props: IButton) => {
  return (
    <Link href={props.href || "#"}>
      <a
        onClick={props.onClick}
        className="h-[34px] text-lg px-4 flex items-center justify-center w-max transition hover:border-secondary hover:border-2"
      >
        <span className="font-semibold">{props.text}</span>
      </a>
    </Link>
  );
};
