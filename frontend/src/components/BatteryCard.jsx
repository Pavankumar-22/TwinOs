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

const BatteryCard = ({ battery, batteryHistory }) => {
  const percent = battery?.percent ?? "N/A";
  const charging =
    battery?.charging === true
      ? "Yes"
      : battery?.charging === false
      ? "No"
      : "Unknown";

  return (
    <div style={cardStyle}>
      <h2>Battery</h2>
      <p>Percentage: {percent}%</p>
      <p>Charging: {charging}</p>

      <div style={{ height: 150, marginTop: 12 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={batteryHistory}>
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} unit="%" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#a855f7"
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

export default BatteryCard;
