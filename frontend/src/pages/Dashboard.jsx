import React from "react";
import { useSystemStats } from "../hooks/useSystemStats";
import CpuCard from "../components/CpuCard";
import RamCard from "../components/RamCard";
import DiskCard from "../components/DiskCard";
import NetworkCard from "../components/NetworkCard";
import BatteryCard from "../components/BatteryCard";

const Dashboard = () => {
  const { stats, history } = useSystemStats();

  if (!stats) {
    return <div>Loading TwinOS stats...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>TwinOS Dashboard</h1>

      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          marginTop: "20px",
        }}
      >
        <CpuCard cpu={stats.cpu} cpuHistory={history.cpu} />
        <RamCard ram={stats.ram} ramHistory={history.ram} />
        <DiskCard disk={stats.disk} />
        <NetworkCard
          network={stats.network}
          netUpHistory={history.netUp}
          netDownHistory={history.netDown}
        />
        <BatteryCard battery={stats.battery} />
      </div>
    </div>
  );
};

export default Dashboard;
