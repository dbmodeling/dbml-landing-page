import { useState, useEffect } from "react";

export type OSTarget = "windows" | "debian" | "fedora" | "macos";

export interface OSConfig {
  id: OSTarget;
  name: string;
  distro: string;
  ext: string;
  label: string;
  downloadUrl: string;
}

const RELEASES_BASE = "https://github.com/dbmodeling/dbml/releases/latest/download";

export const OS_CONFIGS: Record<OSTarget, OSConfig> = {
  windows: {
    id: "windows",
    name: "Windows",
    distro: "Windows 10 / 11",
    ext: ".exe",
    label: "Download for Windows (.exe)",
    downloadUrl: `${RELEASES_BASE}/db-modeling-windows-x86_64.exe`,
  },
  debian: {
    id: "debian",
    name: "Ubuntu / Debian",
    distro: "x86_64 (.deb package)",
    ext: ".deb",
    label: "Download for Ubuntu / Debian (.deb)",
    downloadUrl: `${RELEASES_BASE}/db-modeling-linux-amd64.deb`,
  },
  fedora: {
    id: "fedora",
    name: "Fedora / RHEL",
    distro: "x86_64 (.rpm package)",
    ext: ".rpm",
    label: "Download for Fedora (.rpm)",
    downloadUrl: `${RELEASES_BASE}/db-modeling-linux-x86_64.rpm`,
  },
  macos: {
    id: "macos",
    name: "macOS",
    distro: "Install via curl",
    ext: "curl",
    label: "Install for macOS via curl",
    downloadUrl: "#architecture",
  },
};

export function useOperatingSystem(): {
  currentOS: OSConfig;
  allOS: OSConfig[];
} {
  const [currentOS, setCurrentOS] = useState<OSConfig>(OS_CONFIGS.debian);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = window.navigator.userAgent.toLowerCase();

    if (ua.includes("win")) {
      setCurrentOS(OS_CONFIGS.windows);
    } else if (ua.includes("mac")) {
      setCurrentOS(OS_CONFIGS.macos);
    } else if (ua.includes("fedora") || ua.includes("rhel") || ua.includes("red hat")) {
      setCurrentOS(OS_CONFIGS.fedora);
    } else {
      setCurrentOS(OS_CONFIGS.debian);
    }
  }, []);

  return {
    currentOS,
    // macOS has no direct download: installable via curl only
    allOS: Object.values(OS_CONFIGS).filter((os) => os.id !== "macos"),
  };
}
