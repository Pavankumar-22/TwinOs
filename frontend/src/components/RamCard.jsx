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

const RamCard = ({ ram, ramHistory }) => {
  const totalGb = ram?.total ? (ram.total / (1024 ** 3)).toFixed(2) : "N/A";
  const usedGb = ram?.used ? (ram.used / (1024 ** 3)).toFixed(2) : "N/A";

  const usedPercent =
    ram && ram.total && ram.used
      ? ((ram.used / ram.total) * 100).toFixed(1)
      : null;

  return (
    <div style={cardStyle}>
      <h2>RAM</h2>
      <p>
        {usedGb} GB / {totalGb} GB
      </p>
      {usedPercent !== null && <p>Usage: {usedPercent}%</p>}

      <div style={{ height: 150, marginTop: 12 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ramHistory}>
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
              stroke="#16a34a"
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

export default RamCard;
