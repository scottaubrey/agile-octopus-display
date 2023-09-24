"use client";
import { Brush, Label, Line, LineChart, ReferenceArea, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";

type TariffData = {
  period: string;
  amount: number;
};

export const TimeTable = ({data}: {data: TariffData[]}) => {
  const dateSortedData = data;
  const average = (dateSortedData.map((tariff) => tariff.amount).reduce((previous, current) => previous+current, 0))/dateSortedData.length;
  const min = Math.min(...dateSortedData.map((tariff) => tariff.amount));
  const max = Math.max(...dateSortedData.map((tariff) => tariff.amount));

  const minTick = Math.floor(min-1);
  const maxTick = Math.ceil(max+1);
  const range = [...Array(maxTick-minTick).keys()];
  const ticks = range.slice(0, Math.ceil(range.length/2)).map((number) => (number*2)+(minTick)).map((number) => number.toFixed(2));
  console.log(minTick, maxTick, ticks);

  return (
    <>
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={dateSortedData} margin={{ left: 20, right: 100, bottom: 50 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="period" angle={270} textAnchor='end' />
          <YAxis unit='p' domain={['dataMin-2', 'dataMax+2']} ticks={ticks} />
          <Line type="monotone" dataKey="amount" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPrice)"/>
          <ReferenceLine y={average} stroke="red" strokeDasharray="3 3">
            <Label position='right' color="white">{`${average.toFixed(2)}p avg`}</Label>
          </ReferenceLine>
          <ReferenceLine y={min} stroke="red" strokeDasharray="3 3">
            <Label position='right' color="white">{`${min.toFixed(2)}p min`}</Label>
          </ReferenceLine>
          <ReferenceLine y={max} stroke="red" strokeDasharray="3 3">
            <Label position='right' color="white">{`${max.toFixed(2)}p max`}</Label>
          </ReferenceLine>
          <ReferenceArea x1={data[0].period} x2={data.slice(-1)[0].period} y1={-100} y2={0} fill="royalblue" fillOpacity={0.2}  ifOverflow="hidden" />
          <ReferenceArea x1={data[0].period} x2={data.slice(-1)[0].period} y1={0} y2={9} fill="green" fillOpacity={0.2}  ifOverflow="hidden" />
          <ReferenceArea x1={data[0].period} x2={data.slice(-1)[0].period} y1={9} y2={20} fill="orange" fillOpacity={0.2} ifOverflow="hidden" />
          <ReferenceArea x1={data[0].period} x2={data.slice(-1)[0].period} y1={20} y2={100} fill="red" fillOpacity={0.2}  ifOverflow="hidden" />
          <Brush data={dateSortedData} y={360} dataKey="period"/>
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
