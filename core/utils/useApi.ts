import { useQuery } from "react-query";
import axios from "axios";

export const useGetCurrentData = () => {
  const refetchingTime = 10000;

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
    );

    return data;
  };

  const { data, error, isError, isLoading } = useQuery<CoinProps[]>(
    "coins",
    fetchData,
    { refetchInterval: refetchingTime }
  );

  return { data, error, isError, isLoading };
};

export const addTrade = async (body: TradeBody): Promise<void> => {
  const baseUrl = process.env.BASE_BACKEND_URL;

  // TODO: need to setup authorization. based on the auth0 token
  // need to take the token from the cookies and slice it so I know what I need to check in the backend
  await axios({
    method: "POST",
    url: `${baseUrl}/test`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      body,
    },
  }).then((res) => console.log(res));
};
