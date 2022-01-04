import Image from "next/image";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../Forms/Input";
import { Select } from "../Forms/Select";

interface Props {
  index: number;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
}

/**
 * @param symbol string
 * @param name string
 * @param image string
 * @param current_price number
 * @param market_cap number
 * @param high_24h number
 * @param low_24h number
 * @param price_change_percentage_24h number
 */
export const Coin = (props: Props) => {
  const {
    index,
    symbol,
    name,
    image,
    current_price,
    market_cap,
    high_24h,
    low_24h,
    price_change_percentage_24h,
  } = props;
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex h-14 w-full  items-center justify-between">
      <span className="text-text/50 mr-3">{index}</span>
      <div className="flex w-36">
        <Image src={image} alt={name} layout="fixed" width="24" height="24" />
        <p className="text-text font-semibold ml-2">{name}</p>
        <p className="text-text/50 font-base ml-1">{symbol.toUpperCase()}</p>
      </div>
      <div className="mx-4 ">
        <p className="text-text font-semibold ">{current_price}</p>
      </div>
      <div className="mx-4">
        <p className="text-text font-semibold ">{market_cap}</p>
      </div>
      <div className="mx-4">
        <p className="text-text font-semibold ">{high_24h}</p>
      </div>
      <div className="mx-4">
        <p className="text-text font-semibold ">{low_24h}</p>
      </div>
      <div className="mx-4">
        <p className="text-text font-semibold ">
          <span
            className={
              price_change_percentage_24h > 0
                ? "text-positive"
                : "text-negative"
            }
          >
            {price_change_percentage_24h}%
          </span>
        </p>
      </div>
      <div className="w-28">
        <Select selectValue={(n) => console.log(n)} />
      </div>
      <div className="w-28">{/* <Input /> */}</div>
    </div>
  );
};
