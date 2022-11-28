import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { SingleCoin } from '../config/api'
import { CoinsContext } from '../contexts/CoinsProvider';


export default function CoinCard(props) {

  const [coinData, setCoinData] = useState(null);
  const { coinId } = props;
  const { currency } = useContext(CoinsContext)

  useEffect(() => {
    async function getData() {
      const response = await axios.get(SingleCoin(coinId));
      setCoinData(response.data);
    }
    getData();
  }, [coinId]);

  useEffect(() => {
    if (coinData)
      props.setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinData])

  return (
    <div className="col-span-2">
      {coinData &&
        <div className="flex flex-col text-white px-5">
          <img className="w-48 h-48 mx-auto mt-6" src={coinData?.image.large} alt="" />
          <div className="text-center font-bold text-5xl my-5">{coinData?.name}</div>
          <div className="text-xl leading-8">{coinData?.description.en.substring(0, coinData?.description.en.indexOf(".") + 1)}</div>
          <div className="font-bold text-xl my-2">Rank: <span className="font-normal">{coinData?.market_cap_rank}</span></div>
          <div className="font-bold text-xl my-2">Current Price: <span className="font-normal">{currency === "USD" ? "$" : "VNĐ"} {currency === "USD" ? coinData?.market_data.current_price.usd : coinData?.market_data.current_price.vnd}</span></div>
          <div className="font-bold text-xl my-2">Market Cap: <span className="font-normal">{currency === "USD" ? "$" : "VNĐ"} {currency === "USD" ? (coinData?.market_data.market_cap.usd / (1e9)).toFixed(3) : (coinData?.market_data.market_cap.vnd / (1e9)).toFixed(3)}B</span></div>
        </div>}
    </div>
  )
}
