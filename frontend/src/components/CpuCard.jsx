import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const cardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

const CpuCard = ({ cpu, cpuHistory }) => {
  return (
    <div style={cardStyle}>
      <h2>CPU</h2>
      <p>Usage: {cpu?.usage?.toFixed ? cpu.usage.toFixed(1) : cpu?.usage}%</p>
      <p>Temperature: {cpu?.temperature ?? "N/A"}</p>

      <div style={{ height: 150, marginTop: 12 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cpuHistory}>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
              unit="%"
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CpuCard;
