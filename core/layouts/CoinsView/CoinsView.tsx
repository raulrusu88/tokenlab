import { ReactNode, FC } from "react";
import { Line } from "../../components/Line";
import * as CV from "./styles";

interface ICMC {
  id: number;
  name: string;
  symbol: string;
  slug?: string;
  cmc_rank: number;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      volume_change_24h: number;
    };
  };
}

interface CoinProps {
  data: ICMC[];
}

export const CoinsView = ({ data }: CoinProps) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const SI_PREFIXES = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  // https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
  const abbreviateNumber = (number: any) => {
    if (number === 0) return number;

    let numberFixed;

    const tier = SI_PREFIXES.filter((n) => number >= n.value).pop();
    if (tier) {
      numberFixed = (number / tier.value).toFixed(2);
    }
    return `${numberFixed}${tier?.symbol}`;
  };

  const price = (x) => formatter.format(parseFloat(x));
  const volume24h = (x) => abbreviateNumber(parseFloat(x));

  return (
    <div className="mt-12">
      <CV.Layout>
        <CV.Header>
          <CV.Title text="Market Trends" />
          <CV.Search />
        </CV.Header>
        <Line />
        <CV.Table>
          <CV.TableRow>
            <CV.TableHead text="#" />
            <CV.TableHead text="Name" />
            <CV.TableHead text="Price" />
            <CV.TableHead text="24H Change(%)" />
            <CV.TableHead text="24H Volume(USD)" />
            <CV.TableHead text="Leverage" />
            <CV.TableHead text="Amount(USD)" />
            <CV.TableHead text="Long/Short" />
          </CV.TableRow>
          {data.map((d) => (
            <CV.TableRow key={d.id}>
              <CV.TableData>{d.cmc_rank}</CV.TableData>
              <CV.TableData>{d.name}</CV.TableData>
              <CV.TableData>{price(d.quote.USD.price)}</CV.TableData>
              <CV.TableData>{d.quote.USD.volume_change_24h}</CV.TableData>
              <CV.TableData>{volume24h(d.quote.USD.volume_24h)}</CV.TableData>
              <CV.TableData>1</CV.TableData>
              <CV.TableData>$200</CV.TableData>
              <CV.TableData>YES</CV.TableData>
            </CV.TableRow>
          ))}
        </CV.Table>
      </CV.Layout>
    </div>
  );
};
