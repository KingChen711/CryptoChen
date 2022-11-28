import React, { useContext } from 'react'
import background from "../assets/banner2.jpg"
import AliceCarousel from 'react-alice-carousel';
import { CoinsContext } from '../contexts/CoinsProvider';
import { useNavigate } from "react-router-dom"


export default function Banner() {
  const CoinsData = useContext(CoinsContext);

  return (
    <div className="h-96 text-white" style={{ backgroundImage: `url(${background})` }}>
      <div className="max-w-7xl mx-auto flex flex-col items-center h-full">
        <div className="text-7xl font-bold mt-12">Crypto Chen</div>
        <div className="text-sm text-gray-400 my-8">Get All The Info Regarding Your Favorite Crypto Currency</div>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlay
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={{
            0: {
              items: 2
            },
            512: {
              items: 4
            }
          }}
          items={CoinsData.trending.map(coin => {
            return (
              <Coin currency={CoinsData.currency} coin={coin} />
            )
          })} />
      </div>
    </div>
  )
}




function Coin(props) {
  const coin = props.coin;
  const navigate = useNavigate();

  function handleNavigateToCoin(id) {
    navigate(`/coins/${id}`)
  }

  return (

    <div
      className="col-span-1 flex flex-col justify-center items-center select-none cursor-pointer"
      onClick={() => handleNavigateToCoin(coin.id)}>
      <img className="w-20 h-20" src={coin?.image} alt="" />
      <div className="text-xl my-2">
        {coin?.symbol.toUpperCase()} <span className={`${coin?.price_change_percentage_24h_in_currency > 0 ? "text-green-primary" : "text-red-primary"}`}>{coin.price_change_percentage_24h > 0 && "+"}{coin?.price_change_percentage_24h_in_currency.toFixed(2)}%</span>
      </div>
      <div className="font-bold text-2xl">{props.currency === "USD" ? "$" : "VNĐ"} {coin?.current_price}</div>
    </div>
  );
}

