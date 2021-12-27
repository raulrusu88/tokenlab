import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { Line } from "../../components/Line";
import * as CV from "./styles";
import { useAuth } from "../../context/AuthContext";

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
  const { isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);

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

    let numberFixed: number | string;

    const tier = SI_PREFIXES.filter((n) => number >= n.value).pop();
    if (tier) {
      numberFixed = (number / tier.value).toFixed(2);
    }
    return `${numberFixed}${tier?.symbol}`;
  };

  const price = (x: number) => formatter.format(parseFloat(x.toString()));
  const volume24h = (x: number) => abbreviateNumber(parseFloat(x.toString()));

  return (
    <div className="mt-12">
      <CV.Layout>
        <CV.Header>
          <CV.Title text="Market Trends" />
          <CV.Search />
        </CV.Header>
        <Line />
        <CV.Table>
          <thead>
            <CV.TableRow>
              <CV.TableHead text="#" />
              <CV.TableHead text="Name" />
              <CV.TableHead text="Price" />
              <CV.TableHead text="24H Change(%)" />
              <CV.TableHead text="24H Volume(USD)" />
              <CV.TableHead text="Leverage" />
              <CV.TableHead text="Amount(USD)" />
              {isAuthenticated && <CV.TableHead text="Long/Short" />}
            </CV.TableRow>
          </thead>
          <tbody>
            {data.map((d) => (
              <CV.TableRow key={d.id}>
                <CV.TableData>{d.cmc_rank}</CV.TableData>
                <CV.TableData>{d.name}</CV.TableData>
                <CV.TableData>{price(d.quote.USD.price)}</CV.TableData>
                <CV.TableData>{d.quote.USD.volume_change_24h}</CV.TableData>
                <CV.TableData>{volume24h(d.quote.USD.volume_24h)}</CV.TableData>
                {/* THis should be an input field, that is seen only when the user is Authenticated */}
                <CV.TableData>1</CV.TableData>
                {/* THis should be an input field, that is seen only when the user is Authenticated */}
                <CV.TableData>$200</CV.TableData>
                {isAuthenticated && (
                  <CV.TableData>
                    <CoinButton data={d} id={d.id} />
                  </CV.TableData>
                )}
              </CV.TableRow>
            ))}
          </tbody>
        </CV.Table>
      </CV.Layout>
    </div>
  );
};

const CoinButton = ({ id, data }: { id?: string | number; data?: ICMC }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (id === data.id) {
      console.log(data);
    }
  };
  return (
    <>
      <button onClick={handleClick}>CLICK</button>
    </>
  );
};
