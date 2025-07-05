// app/test-map/page.tsx
"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, Title } from "@mantine/core";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Use an orange marker icon
const orangeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type SwarmTrap = {
  id: number;
  latitude: number;
  longitude: number;
  label: string;
  caughtSwarms: number;
  lastUpdated: string;
};

const mockData: SwarmTrap[] = [
  {
    id: 1,
    latitude: 42.7872,
    longitude: -83.7729,
    label: "Trap at Oak Tree",
    caughtSwarms: 2,
    lastUpdated: "2025-06-29",
  },
  {
    id: 2,
    latitude: 42.7881,
    longitude: -83.7718,
    label: "Field Edge Trap",
    caughtSwarms: 1,
    lastUpdated: "2025-06-25",
  },
  {
    id: 3,
    latitude: 42.7865,
    longitude: -83.7735,
    label: "Barn Roof Trap",
    caughtSwarms: 0,
    lastUpdated: "2025-06-22",
  },
  {
    id: 4,
    latitude: 42.7887,
    longitude: -83.7742,
    label: "Pine Grove Trap",
    caughtSwarms: 3,
    lastUpdated: "2025-06-30",
  },
  {
    id: 5,
    latitude: 42.7859,
    longitude: -83.7721,
    label: "Old Shed Trap",
    caughtSwarms: 1,
    lastUpdated: "2025-06-28",
  },
  {
    id: 6,
    latitude: 42.7877,
    longitude: -83.7713,
    label: "Creekside Trap",
    caughtSwarms: 0,
    lastUpdated: "2025-06-24",
  },
  {
    id: 7,
    latitude: 42.7862,
    longitude: -83.7709,
    label: "Orchard Trap",
    caughtSwarms: 2,
    lastUpdated: "2025-06-27",
  },
  {
    id: 8,
    latitude: 42.7883,
    longitude: -83.7737,
    label: "Hilltop Trap",
    caughtSwarms: 4,
    lastUpdated: "2025-06-26",
  },
  {
    id: 9,
    latitude: 42.7853,
    longitude: -83.7751,
    label: "South Pasture Trap",
    caughtSwarms: 1,
    lastUpdated: "2025-06-23",
  },
  {
    id: 10,
    latitude: 42.7868,
    longitude: -83.7703,
    label: "Tool Shed Trap",
    caughtSwarms: 2,
    lastUpdated: "2025-06-21",
  },
];

export default function TestMapPage() {
  const [traps, setTraps] = useState<SwarmTrap[]>([]);

  useEffect(() => {
    setTraps(mockData);
  }, []);

  const lat = mockData[0]?.latitude || 42.6; // Default to Linden, MI if no traps
  const lng = mockData[0]?.longitude || -83.6; // Default to
  const center = [lat, lng] as [number, number];

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={center}
        zoom={17}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {traps.map((trap) => (
          <Marker
            key={trap.id}
            position={[trap.latitude, trap.longitude]}
            icon={orangeIcon}
          >
            <Popup>
              <Card>
                <Title order={5}>{trap.label}</Title>
                <p>Swarms Caught: {trap.caughtSwarms}</p>
                <p>Last Updated: {trap.lastUpdated}</p>
              </Card>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
