import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Coin } from "../../components/Coin/Coin";
import { Input } from "../../components/Forms/Input";
import { Select } from "../../components/Forms/Select";
import { Line } from "../../components/Line";
import { useAuth } from "../../context/AuthContext";
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
  const { isAuthenticated } = useAuth();

  const [coins, setCoins] = useState([]);

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
    return `$${numberFixed}${tier?.symbol}`;
  };

  const price = (x: number) => formatter.format(parseFloat(x.toString()));
  const volume24h = (x: number) => abbreviateNumber(parseFloat(x.toString()));

  const [selectValue, setSelectValue] = useState<number>(null);

  const handleSelectValue = (n: number): void => {
    setSelectValue(n);
  };
  // TODO: Select value does not work properly, as it should pass the data from the row it is used
  // and when you click the button to add the trade, it should forward the selected value.
  // as of now, it passes only 1, as it is from the Select component initial value
  const fetchData = useCallback(async () => {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-12">
      <CV.Layout>
        <CV.Header>
          <CV.Title text="Market" />
          <CV.Search />
        </CV.Header>
        <Line />
        <div className="flex flex-col">
          {coins.map((coin, index) => (
            <Coin
              key={coin.id}
              {...coin}
              index={index + 1}
              current_price={price(coin.current_price)}
              market_cap={volume24h(coin.market_cap)}
              high_24h={price(coin.high_24h)}
              low_24h={price(coin.low_24h)}
              price_change_percentage_24h={coin.price_change_percentage_24h.toFixed(
                2
              )}
            />
          ))}
        </div>
      </CV.Layout>
    </div>
  );
};

const CoinButton = ({
  id,
  data,
  selectValue,
}: {
  id?: string | number;
  data?: ICMC;
  selectValue: number;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (id === data.id) {
      console.log(data);
      console.log(selectValue);
    }
  };
  return (
    <>
      <button onClick={handleClick}>CLICK</button>
    </>
  );
};

// TODO: Change it to a table
// const Table = () => (
//   <CV.Table>
//           <thead>
//             <CV.TableRow>
//               <CV.TableHead text="#" />
//               <CV.TableHead text="Name" />
//               <CV.TableHead text="Price" />
//               <CV.TableHead text="24H Change(%)" />
//               <CV.TableHead text="24H Volume(USD)" />
//               {isAuthenticated && (
//                 <>
//                   <CV.TableHead text="Leverage" />
//                   <CV.TableHead text="Amount(USD)" />
//                   <CV.TableHead text="Long/Short" />{" "}
//                 </>
//               )}
//             </CV.TableRow>
//           </thead>
//           <tbody>
//             {data.map((d) => (
//               <CV.TableRow key={d.id}>
//                 <CV.TableData>{d.cmc_rank}</CV.TableData>
//                 <CV.TableData>{d.name}</CV.TableData>
//                 <CV.TableData>{price(d.quote.USD.price)}</CV.TableData>
//                 <CV.TableData>{d.quote.USD.volume_change_24h}</CV.TableData>
//                 <CV.TableData>{volume24h(d.quote.USD.volume_24h)}</CV.TableData>
//                 {isAuthenticated && (
//                   <>
//                     <CV.TableData>
//                       <Select selectValue={(n) => handleSelectValue(n)} />
//                     </CV.TableData>
//                     <CV.TableData>
//                       <Input />
//                     </CV.TableData>
//                     <CV.TableData>
//                       <CoinButton
//                         data={d}
//                         id={d.id}
//                         selectValue={selectValue}
//                       />
//                     </CV.TableData>
//                   </>
//                 )}
//               </CV.TableRow>
//             ))}
//           </tbody>
//         </CV.Table>
// )
