import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { HistoricalChart } from "../config/api"
import { Line } from 'react-chartjs-2';
import { CategoryScale, LinearScale, PointElement, LineElement, Chart } from "chart.js";
import { CoinsContext } from '../contexts/CoinsProvider';

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

export default function ChartCoin(props) {

  const [chartData, setChartData] = useState();
  const [days, setDays] = useState(1);
  const coinId = props.coinId;
  const { currency } = useContext(CoinsContext)
  const [selectedItems, setSelectedItems] = useState([
    {
      content: "24 Hours",
      selected: true
    },
    {
      content: "30 Days",
      selected: false
    },
    {
      content: "3 Months",
      selected: false
    },
    {
      content: "1 Year",
      selected: false
    }
  ])


  useEffect(() => {
    if (chartData)
      props.setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData])


  useEffect(() => {
    async function getChartData() {
      await axios.get(HistoricalChart(coinId, days, currency))
        .then(res => setChartData(res.data));
    }
    getChartData();
  }, [coinId, days, currency])



  function handleChangeDays(index) {
    setChartData(null);
    setSelectedItems(selectedItems.map((item, indexItem) => {
      if (indexItem === index) {
        return {
          ...item,
          selected: true
        }
      }
      else
        return {
          ...item,
          selected: false
        }
    }))
    const days = [1, 30, 90, 365];
    setDays(days[index]);
  }


  return (
    <div className="col-span-5 text-white border-l border-l-slate-300">
      {chartData &&
        <div>
          <div className="text-center">Price {`( Past ${days} days )`} in {currency}</div>
          <Line
            data={{
              labels: chartData?.prices.map(coin => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [{
                data: chartData.prices.map(coin => coin[1]),
                borderColor: "#ffd700",
                label: "Hello World",
              }]
            }}
            options={{
              elements: {
                point: {
                  radius: 1
                }
              }
            }}
          />
          <div className="grid grid-cols-4 gap-6 px-12 py-6">
            {selectedItems.map((item, index) => {
              return <SelectButton
                key={item.content}
                handleChangeDays={handleChangeDays}
                index={index}
                content={item.content}
                selected={item.selected} />
            })}
          </div>
        </div>
      }
    </div>
  )
}

function SelectButton(props) {
  return (
    <div
      className={`col-span-1 py-2 px-4 text-white bg-black-primary border border-yellow-secondary rounded-lg cursor-pointer text-center text-xl hover:bg-yellow-secondary hover:text-black ${props.selected && "bg-yellow-secondary text-black"}`}
      onClick={() => props.handleChangeDays(props.index)}
    >
      {props.content}
    </div>
  )
}