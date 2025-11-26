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

function bytesToMBps(bytesPerSec) {
  return bytesPerSec > 0 ? bytesPerSec / (1024 * 1024) : 0;
}

const DiskCard = ({
  disk,
  diskReadHistory = [],
  diskWriteHistory = [],
}) => {
  const readMBps = bytesToMBps(disk?.read);
  const writeMBps = bytesToMBps(disk?.write);

  const combinedHistory = (diskReadHistory ?? []).map((point, idx) => ({
    time: point.time,
    read: point.value,
    write: diskWriteHistory?.[idx]?.value ?? 0,
  }));

  return (
    <div style={cardStyle}>
      <h2>Disk</h2>
      <p>Read: {readMBps.toFixed(2)} MB/s</p>
      <p>Write: {writeMBps.toFixed(2)} MB/s</p>

      <div style={{ height: 150, marginTop: 12 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedHistory}>
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis
              tick={{ fontSize: 10 }}
              tickFormatter={(val) => bytesToMBps(val).toFixed(1)}
              label={{
                value: "MB/s",
                angle: -90,
                position: "insideLeft",
                fontSize: 10,
              }}
            />
            <Tooltip formatter={(val) => `${bytesToMBps(val).toFixed(2)} MB/s`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="read"
              name="Read"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="write"
              name="Write"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiskCard;
