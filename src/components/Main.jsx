import React, { useContext, useEffect, useState } from 'react'
import { CoinsContext } from '../contexts/CoinsProvider';
import { useNavigate } from "react-router-dom"

export default function Main() {
  const coinsData = useContext(CoinsContext)
  const [searchText, setSearchText] = useState("");
  const [coins, setCoins] = useState([]);

  
  useEffect(() => {
    setCoins(coinsData.coins)
  }, [coinsData])


  async function handleSearch(e) {
    const searchText = e.target.value;
    setSearchText(searchText);
    let res = [];
    for (let i = 0; i < coinsData.coins.length; i++) {
      const coin = coinsData.coins[i];
      console.log(coin);
      if (coin.symbol.toLowerCase().includes(searchText.toLowerCase())
        || coin.name.toLowerCase().includes(searchText.toLowerCase())) {
        res.push(coin);
      }
    }
    setCoins(res);
  }


  return (
    <div className="mx-auto max-w-7xl flex flex-col items-center text-white pb-4">
      <div className="text-4xl my-4 text-center">Cryptocurrency Prices by Market Cap</div>
      <input
        value={searchText}
        onChange={(e) => { handleSearch(e) }}
        className="w-full p-4"
        type="search"
        placeholder='Search For a Crypto Currency...' />
      <div className="w-full bg-yellow-secondary grid grid-cols-9 text-black font-bold p-4 rounded-md mt-4">
        <div className="col-span-3">Coin</div>
        <div className="col-span-2 text-end">Price</div>
        <div className="col-span-2 text-end">24h Change</div>
        <div className="col-span-2 text-end">Market Cap</div>
      </div>
      {coins.map((coin) => {
        return <Coin
          key={coin.id}
          coin={coin}
          currency={coinsData.currency} />
      })}
    </div>
  )
}


function Coin(props) {
  const navigate = useNavigate();

  function handleNavigateToCoin(id) {
    navigate(`/coins/${id}`)
  }
  const coin = props.coin;
  return (
    <div className="w-full grid grid-cols-9 p-4 bg-black-secondary border-b border-b-slate-400 cursor-pointer hover:bg-black-tertiary" onClick={() => { handleNavigateToCoin(coin.id) }}>
      <div className="col-span-3 flex justify-start-start items-center">
        <img
          className="w-12 h-12 mr-4"
          src={coin.image}
          alt="" />
        <div>
          <div className="text-2xl">{coin.symbol.toUpperCase()}</div>
          <div className="text-xl">{coin.name}</div>
        </div>
      </div>
      <div className="col-span-2 flex justify-end items-center">{props.currency === "USD" ? "$" : "VNĐ"} {coin.current_price}</div>
      <div
        className={`col-span-2 flex justify-end items-center
      ${coin.price_change_percentage_24h > 0 ? "text-green-primary" : "text-red-primary"}`}>
        {coin.price_change_percentage_24h > 0 && "+"}{coin.price_change_percentage_24h.toFixed(2)}%
      </div>
      <div className="col-span-2 flex justify-end items-center">{props.currency === "USD" ? "$" : "VNĐ"} {(coin.market_cap / (1e9)).toFixed(3)}B</div>
    </div>
  )
}