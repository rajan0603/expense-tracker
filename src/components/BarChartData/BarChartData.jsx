import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./BarChartData.css";

const processData = (data) => {
  const categoryTotals = data.reduce((acc, item) => {
    const amount = Number(item.price) || 0;
    acc[item.category] = acc[item.category] || {
      category: item.category,
      total: 0,
    };
    acc[item.category].total += amount;
    return acc;
  }, {});

  return Object.values(categoryTotals)
    .sort((a, b) => b.total - a.total)
    .map((cat) => ({ name: cat.category, value: cat.total }));
};

const BarChartData = ({ data }) => {
  const processedData = processData(data);

  return ( 

    <div className="bar-chart">
      {/* <h1 className="title"> Top Expensive </h1> */}
      <div className="bar">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={processedData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar
              dataKey="value"
              barSize={20}
              radius={[0, 10, 10, 0]}
              fill="#8884d8"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartData;