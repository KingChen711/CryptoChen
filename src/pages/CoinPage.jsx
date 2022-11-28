import React, { useState } from 'react'
import CoinCard from '../components/CoinCard'
import ChartCoin from '../components/ChartCoin'
import { useParams } from "react-router-dom";


export default function CoinPage() {
  let { id } = useParams();
  const [loadingCoin, setLoadingCoin] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);

  return (
    <div>
      <div className={`${(!loadingCoin && !loadingChart) && "hidden"} text-center text-5xl text-white`}>
        Loading...
      </div>
      <div className={`${(loadingCoin || loadingChart) && "hidden"} w-full grid grid-cols-7`}>
        <CoinCard setLoading={setLoadingCoin} coinId={id} />
        <ChartCoin setLoading={setLoadingChart} coinId={id} />
      </div>
    </div>
  )
}
