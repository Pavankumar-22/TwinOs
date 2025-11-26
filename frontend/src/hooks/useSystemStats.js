import { useEffect, useState } from "react";
import { fetchSystemStats } from "../services/statsService";

const MAX_POINTS = 60; // last 60 seconds

export function useSystemStats() {
  const [stats, setStats] = useState(null);

  const [history, setHistory] = useState({
    cpu: [],
    ram: [],
    netUp: [],
    netDown: [],
    diskRead: [],
    diskWrite: [],
    battery: [],
  });

  useEffect(() => {
    let intervalId;

    async function loadStats() {
      try {
        const data = await fetchSystemStats();
        setStats(data);

        const timeLabel = new Date().toLocaleTimeString("en-GB", {
          minute: "2-digit",
          second: "2-digit",
        });

        setHistory((prev) => {
          const nextCpu = [
            ...prev.cpu,
            { time: timeLabel, value: data.cpu?.usage ?? 0 },
          ].slice(-MAX_POINTS);

          const usedRamPercent =
            data.ram && data.ram.total && data.ram.used
              ? (data.ram.used / data.ram.total) * 100
              : 0;

          const nextRam = [
            ...prev.ram,
            { time: timeLabel, value: usedRamPercent },
          ].slice(-MAX_POINTS);

          const nextNetUp = [
            ...prev.netUp,
            { time: timeLabel, value: data.network?.up ?? 0 },
          ].slice(-MAX_POINTS);

          const nextNetDown = [
            ...prev.netDown,
            { time: timeLabel, value: data.network?.down ?? 0 },
          ].slice(-MAX_POINTS);

          const nextDiskRead = [
            ...prev.diskRead,
            { time: timeLabel, value: data.disk?.read ?? 0 },
          ].slice(-MAX_POINTS);

          const nextDiskWrite = [
            ...prev.diskWrite,
            { time: timeLabel, value: data.disk?.write ?? 0 },
          ].slice(-MAX_POINTS);

          const nextBattery = [
            ...prev.battery,
            { time: timeLabel, value: data.battery?.percent ?? 0 },
          ].slice(-MAX_POINTS);

          return {
            cpu: nextCpu,
            ram: nextRam,
            netUp: nextNetUp,
            netDown: nextNetDown,
            diskRead: nextDiskRead,
            diskWrite: nextDiskWrite,
            battery: nextBattery,
          };
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    }

    loadStats();
    intervalId = setInterval(loadStats, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return { stats, history };
}
