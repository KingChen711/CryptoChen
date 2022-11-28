import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'
import Homepage from '../pages/Homepage'
import CoinPage from '../pages/CoinPage'
import CoinsProvider from '../contexts/CoinsProvider'

export default function App() {
  return (
    <BrowserRouter>
      <CoinsProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </CoinsProvider>
    </BrowserRouter>
  )
}
