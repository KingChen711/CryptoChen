import React, { useState, useContext } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useNavigate } from "react-router-dom"
import { CoinsContext } from '../contexts/CoinsProvider';

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="h-16 ">
      <div className="text-yellow-primary h-full mx-auto max-w-7xl flex justify-between items-center px-10">
        <div className="font-bold text-2xl cursor-pointer" onClick={() => navigate("/")}>Crypto Chen</div>
        <MenuUnit />
      </div>
    </div>
  )
}

function MenuUnit() {
  const [isDrop, setIsDrop] = useState(false);
  const [selected, setSelected] = useState(localStorage.getItem("currency") || "USD");
  const coinsData = useContext(CoinsContext)


  function handleClick() {
    setIsDrop(!isDrop);
  }


  function handleSelect(selection) {
    setSelected(selection);
    setIsDrop(!isDrop);
    coinsData.changeCurrency(selection);
  }

  
  return (
    <div className="relative cursor-pointer select-none w-28 text-white">
      <div onClick={handleClick} className="border-grey border-2 hover:border-white px-4 py-2 rounded-md">
        {selected} {isDrop ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </div>
      <ul className={`absolute bg-black-primary w-full rounded-md overflow-hidden ${!isDrop && "hidden"}`}>
        <li className="px-4 py-2 hover:opacity-50 hover:bg-black-secondary" onClick={() => handleSelect("USD")}>USD</li>
        <li className="px-4 py-2 hover:opacity-50 hover:bg-black-secondary" onClick={() => handleSelect("VND")}>VND</li>
      </ul>
    </div>
  );
}

