import Link from "next/link";

interface IButton {
  text: string;
  href?: string;
  onClick?: () => void;
  coin?: boolean;
  trade_long?: boolean;
  trade_short?: boolean;
}

export const Button = (props: IButton) => {
  return (
    <>
      {props.coin ? (
        <button
          className={`h-[34px] text-white px-4 transition rounded-sm my-[1px]  ${
            props.trade_long && "bg-positive hover:bg-positive/50"
          } ${props.trade_short && "bg-negative hover:bg-negative/50"}`}
          onClick={props.onClick}
        >
          {props.text}
        </button>
      ) : (
        <Link href={props.href || "#"}>
          <a
            onClick={props.onClick}
            className="h-[34px] text-lg px-4 flex items-center justify-center w-max transition hover:border-secondary hover:border-2"
          >
            <span className="font-semibold">{props.text}</span>
          </a>
        </Link>
      )}
    </>
  );
};
