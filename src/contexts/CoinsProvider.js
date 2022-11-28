import React, { useEffect, useState } from "react"
import axios from "axios"
import { TrendingCoins, CoinList } from "../config/api"


export const CoinsContext = React.createContext()

export default function CoinsProvider({ children }) {
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "USD");
  const [coins, setCoins] = useState([]);
  const [trending, setTrending] = useState([]);


  useEffect(() => {
    localStorage.setItem("currency", "USD");
  }, [])


  useEffect(() => {
    async function getTrending() {
      const response = await axios.get(TrendingCoins(currency));
      setTrending(response.data);
    }
    getTrending();
  }, [currency])


  useEffect(() => {
    async function getCoins() {
      const response = await axios.get(CoinList(currency));
      setCoins(response.data);
    }
    getCoins();
  }, [currency])


  return (
    <CoinsContext.Provider value={{
      trending,
      coins,
      currency,
      changeCurrency: (currency) => {
        localStorage.setItem("currency", currency);
        setCurrency(currency);
      }
    }}>
      {children}
    </CoinsContext.Provider>
  )
}

