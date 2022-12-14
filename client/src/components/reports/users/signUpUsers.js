import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { IAM_APP, REPORTS_USERS } from '../../../utils/constants';
import { useFetchApi } from "../../../utils/hooks";
import { UrlQuery } from "../../../utils/utils";


// const data = [
//   {
//     date: "1399-01",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400
//   },
//   {
//     date: "1399-02",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210
//   },
//   {
//     date: "1399-03",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290
//   },
//   {
//     date: "1399-04",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000
//   },
//   {
//     date: "1399-05",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181
//   },
//   {
//     date: "1399-06",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500
//   },
//   {
//     date: "1399-07",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100
//   },
//   {
//     date: "1399-08",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400
//   },
//   {
//     date: "1399-09",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210
//   },
//   {
//     date: "1399-10",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290
//   },
//   {
//     date: "1399-11",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000
//   },
//   {
//     date: "1399-12",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181
//   }
// ];

const monthTickFormatter = (tick) => {
  const date = new Date(tick);

  return date.getMonth() + 1;
};

// const renderQuarterTick = (tickProps) => {
//   const { x, y, payload } = tickProps;
//   const { value, offset } = payload;
//   const date = new Date(value);
//   const month = date.getMonth();
//   const quarterNo = Math.floor(month / 3) + 1;

//   if (month % 3 === 1) {
//     return <text x={x} y={y - 4} textAnchor="middle">{`Q${quarterNo}`}</text>;
//   }

//   const isLast = month === 11;

//   if (month % 3 === 0 || isLast) {
//     const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5;

//     return <path d={`M${pathX},${y - 4}v${-35}`} stroke="red" />;
//   }
//   return null;
// };

export default function SignUpUsers({ type }) {
  const [params, setParams] = React.useState({ period: {}, unique: {} });
  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, []);
  // const [type, setType] = React.useState();

  React.useEffect(() => {
    doFetch("GET", IAM_APP, UrlQuery(REPORTS_USERS(type), { ...params }))
  }, [params])


  for (var prop in data) {
    console.log(prop + ':' + data[prop]);
    // const person = {
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   age: 25
    // };

    const profile = Object.values(data[prop]);

    console.log(profile);

  }

  console.log("signup", data);
  return (
    <BarChart
      width={730}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <Legend align="right" verticalAlign="top" />
      <CartesianGrid strokeDasharray="2 2" vertical={false} horizontal={true} />
      <XAxis dataKey="date" tickFormatter={monthTickFormatter} />
      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        interval={0}
        // tick={renderQuarterTick}
        height={1}
        scale="band"
        xAxisId="quarter"
      />
      <YAxis />
      <Tooltip />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  );
}
