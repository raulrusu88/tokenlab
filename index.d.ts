interface CoinProps {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
}

interface TradeBody {
  id: string;
  image: string;
  name: string;
  symbol: string;
  buy_price: number;
}
interface GetCoinProp {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  type: "long" | "short";
  amount: number;
}
