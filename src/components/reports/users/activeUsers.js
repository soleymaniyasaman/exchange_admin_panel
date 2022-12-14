// import "./styles.css";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { IAM_APP, REPORTS_USERS } from '../../../utils/constants';
import { useFetchApi } from "../../../utils/hooks";
import { UrlQuery } from "../../../utils/utils";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function ActiveUsers({ type }) {
  const [params, setParams] = React.useState({ period: {}, unique: {} });
  const [{ data, isLoading, hasError }, doFetch] = useFetchApi(undefined, []);
  // const [type, setType] = React.useState();

  React.useEffect(() => {
    doFetch("GET", IAM_APP, UrlQuery(REPORTS_USERS(type), { ...params }))
  }, [params])

  return (
    <PieChart width={268} height={300}>
      <Legend align="right" height={30} />
      <Pie
        data={data}
        cx={134}
        cy={134}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={100}
        innerRadius={60}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
