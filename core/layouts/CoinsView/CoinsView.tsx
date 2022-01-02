import Image from "next/image";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Coin } from "../../components/Coin/Coin";
import { Input } from "../../components/Forms/Input";
import { Select } from "../../components/Forms/Select";
import { Line } from "../../components/Line";
import { useAuth } from "../../context/AuthContext";
import * as CV from "./styles";
import { ModalCoin } from "../../components/Modal/ModalCoin";
import { formatter, abbreviateNumber } from "../../utils/abbreviateNumber";

export const CoinsView = () => {
  const { isAuthenticated } = useAuth();

  const [coins, setCoins] = useState([]);
  const [modal, setModal] = useState(false);

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

  const handleOpen = () => {
    setModal(!open);
  };

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
        <CV.Table>
          <thead>
            <CV.TableRow>
              <CV.TableHead text="#" className="w-16" />
              <CV.TableHead text="Name" className="w-max" />
              <CV.TableHead text="Price" />
              <CV.TableHead text="Market Cap" />
              <CV.TableHead text="High 24H" />
              <CV.TableHead text="Low 24H" />
              <CV.TableHead text="24H % Change" />
              <CV.TableHead text="Leverage" />
              <CV.TableHead text="Buy Amount ($)" />
            </CV.TableRow>
          </thead>
          <tbody>
            {coins.map((d, index) => (
              <>
                <CV.TableRow key={d.id} onClick={() => console.log(d)}>
                  <CV.TableData>{index + 1}</CV.TableData>
                  <CV.TableData className="w-max">
                    <div className="flex ">
                      <Image
                        src={d.image}
                        alt={d.name}
                        layout="fixed"
                        width="24"
                        height="24"
                      />
                      <p className="text-text font-semibold ml-2">{d.name}</p>
                      <p className="text-text/50 font-base ml-1">
                        {d.symbol.toUpperCase()}
                      </p>
                    </div>
                  </CV.TableData>
                  <CV.TableData>
                    <p className="text-text font-semibold ">
                      {price(d.current_price)}
                    </p>
                  </CV.TableData>
                  <CV.TableData>
                    <p className="text-text font-semibold">
                      {volume24h(d.market_cap)}
                    </p>
                  </CV.TableData>
                  <CV.TableData>
                    <p className="text-text font-semibold">
                      {price(d.high_24h)}
                    </p>
                  </CV.TableData>
                  <CV.TableData>
                    <p className="text-text font-semibold">
                      {price(d.low_24h)}
                    </p>
                  </CV.TableData>
                  <CV.TableData>
                    <p className="text-text font-semibold ">
                      <span
                        className={
                          d.price_change_percentage_24h > 0
                            ? "text-positive"
                            : "text-negative"
                        }
                      >
                        {d.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </p>
                  </CV.TableData>
                  <CV.TableData>
                    <Select selectValue={(n) => handleSelectValue(n)} />
                  </CV.TableData>
                  <CV.TableData>
                    <Input />
                  </CV.TableData>
                </CV.TableRow>
              </>
            ))}
          </tbody>
        </CV.Table>
      </CV.Layout>
    </div>
  );
};

const CoinButton = ({
  id,
  selectValue,
}: {
  id?: string | number;
  selectValue: number;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (id === id) {
      console.log([]);
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
// // )
