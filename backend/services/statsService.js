const si = require("systeminformation");

const fetchSystemStats = async () => {
  try {
    const [
      cpuLoad,
      cpuTemp,
      memory,
      diskIO,
      networkSpeed,
      battery,
    ] = await Promise.all([
      si.currentLoad(),
      si.cpuTemperature(),
      si.mem(),
      si.disksIO().catch(() => null),
      si.networkStats().catch(() => []),
      si.battery().catch(() => ({})),
    ]);

    // --- Safe Disk (Windows-friendly) ---
    const safeDisk = {
      read: diskIO?.rIO_sec || 0,       
      write: diskIO?.wIO_sec || 0, 
    };

    // --- Safe Network ---
    let safeNetwork = { up: 0, down: 0 };
    if (Array.isArray(networkSpeed) && networkSpeed.length > 0) {
      safeNetwork = {
        up: networkSpeed[0].tx_sec || 0,
        down: networkSpeed[0].rx_sec || 0,
      };
    }

    // --- Safe Battery ---
    const safeBattery = {
      percent: battery?.percent ?? null,
      charging: battery?.ischarging ?? null,
      health: battery?.health ?? null,
    };

    return {
      cpu: {
        usage: cpuLoad.currentLoad || 0,
        perCore: cpuLoad.cpus ? cpuLoad.cpus.map(c => c.load) : [],
        temperature: cpuTemp.main || null,
        maxTemperature: cpuTemp.max || null,
      },
      ram: {
        total: memory.total,
        used: memory.used,
        free: memory.free,
      },
      disk: safeDisk,
      network: safeNetwork,
      battery: safeBattery,
    };
  } catch (error) {
    console.error("StatsService error:", error);
    throw new Error("Failed to fetch system stats");
  }
};

module.exports = {
  fetchSystemStats,
};
