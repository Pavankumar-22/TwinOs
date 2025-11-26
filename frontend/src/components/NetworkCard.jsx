import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const cardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

function formatBytesPerSecToMbps(bytesPerSec) {
  if (!bytesPerSec || bytesPerSec <= 0) return 0;
  // bytes → megabits: (bytes * 8) / (1024^2)
  return (bytesPerSec * 8) / (1024 * 1024);
}

const NetworkCard = ({ network, netUpHistory, netDownHistory }) => {
  // Merge upload + download history into one array for Recharts
  const combinedHistory = netUpHistory.map((point, idx) => ({
    time: point.time,
    up: point.value,
    down: netDownHistory[idx]?.value ?? 0,
  }));

  const currentUpMbps = formatBytesPerSecToMbps(network?.up);
  const currentDownMbps = formatBytesPerSecToMbps(network?.down);

  return (
    <div style={cardStyle}>
      <h2>Network</h2>
      <p>Up: {currentUpMbps.toFixed(2)} Mbps</p>
      <p>Down: {currentDownMbps.toFixed(2)} Mbps</p>

      <div style={{ height: 150, marginTop: 12 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedHistory}>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 10 }}
              tickFormatter={(value) =>
                formatBytesPerSecToMbps(value).toFixed(1)
              }
              label={{
                value: "Mbps",
                angle: -90,
                position: "insideLeft",
                fontSize: 10,
              }}
            />
            <Tooltip
              formatter={(value) =>
                `${formatBytesPerSecToMbps(value).toFixed(2)} Mbps`
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="up"
              name="Upload"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="down"
              name="Download"
              stroke="#0ea5e9"
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

export default NetworkCard;
