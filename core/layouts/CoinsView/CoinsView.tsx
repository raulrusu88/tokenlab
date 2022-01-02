import Image from "next/image";
import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { Input } from "../../components/Forms/Input";
import { Select } from "../../components/Forms/Select";
import { Line } from "../../components/Line";
import { useAuth } from "../../context/AuthContext";
import * as CV from "./styles";
import { price, volume } from "../../utils/abbreviateNumber";
import { useGetCurrentData } from "../../utils/useApi";
import { Button } from "../../components/Buttons/Button";

export const CoinsView = () => {
  const { isAuthenticated } = useAuth();
  const [getCoin, setGetCoin] = useState<GetCoinProp>(null);

  const { data, isLoading, isError, error } = useGetCurrentData();

  const [selectValue, setSelectValue] = useState<number>(null);
  //TODO:  Change this to useRef
  const [inputValue, setInputValue] = useState<string>("");

  // TODO: check this, there's something strange going on, I can't even explain
  const handleGetCoin = useCallback(
    (value: GetCoinProp) => {
      setGetCoin(value);

      return () => setGetCoin(null);
    },
    [setGetCoin]
  );

  const handleSelectValue = (n: number): void => {
    setSelectValue(n);
  };

  useEffect(() => {
    console.log(getCoin);
  }, [data, getCoin]);

  return (
    <div className="mt-12">
      <CV.Layout>
        <CV.Header>
          <CV.Title text="Market" />
          <CV.Search />
        </CV.Header>
        <Line />
        {isError && <h3>Something went wrong...</h3>}
        {isLoading && <h1>Loading data...</h1>}
        {data && !isLoading && (
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
                {isAuthenticated && (
                  <>
                    <CV.TableHead text="Leverage" />
                    <CV.TableHead text="Buy Amount ($)" />
                    <CV.TableHead />
                  </>
                )}
              </CV.TableRow>
            </thead>
            <tbody>
              {data?.map((d, index) => (
                <CV.TableRow key={d.id} id={d.id}>
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
                      {volume(d.market_cap)}
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
                  {isAuthenticated && (
                    <>
                      <CV.TableData>
                        <Select selectValue={(n) => handleSelectValue(n)} />
                      </CV.TableData>
                      <CV.TableData>
                        <Input value={inputValue} setValue={setInputValue} />
                      </CV.TableData>
                      <CV.TableData>
                        <div className="flex flex-col px-3">
                          <Button
                            text="Long"
                            trade_long
                            coin
                            onClick={() =>
                              handleGetCoin({
                                id: d.id,
                                current_price: d.current_price,
                                name: d.name,
                                symbol: d.symbol,
                                image: d.image,
                                type: "long",
                                amount: Number(inputValue),
                              })
                            }
                          />
                          <Button
                            text="Short"
                            trade_short
                            coin
                            onClick={() =>
                              handleGetCoin({
                                id: d.id,
                                current_price: d.current_price,
                                name: d.name,
                                symbol: d.symbol,
                                image: d.image,
                                type: "short",
                                amount: Number(inputValue),
                              })
                            }
                          />
                        </div>
                      </CV.TableData>
                    </>
                  )}
                </CV.TableRow>
              ))}
            </tbody>
          </CV.Table>
        )}
      </CV.Layout>
    </div>
  );
};
