import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./PieChartData.css";

const processDataForPieChart = ({data}) => {
    const categories = {};
  
    data.forEach((item) => {
      if (categories[item.category]) {
        categories[item.category] += parseInt(item.price, 10);
      } else {
        categories[item.category] = parseInt(item.price, 10);
      }
    });
  
    return Object.keys(categories).map((category) => ({
      name: category,
      value: categories[category],
    }));
  };

function PieChartData(data) {

    const processedData = processDataForPieChart(data);
    const COLORS = ["#0088DE", "#00D89F", "#FFBB32", "#FF8082", "#AF19AF"];

    return (
        <PieChart className="chart " width={400} height={400}>
        <Pie
            data={processedData}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={true}
        >
            {processedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Tooltip />
        <Legend className="chart-legend" />
        </PieChart>
    );
}

export default PieChartData;