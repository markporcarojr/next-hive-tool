// app/test-map/page.tsx
"use client";

import { SwarmInput } from "@/lib/schemas/swarmTrap";
import { Card, Title } from "@mantine/core";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { set } from "zod";

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

export default function TestMap() {
  const [traps, setTraps] = useState<SwarmInput[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/swarm");
      const data = await res.json();
      setTraps(data);
    };
    fetchData();
  }, []);

  const lat = traps[0]?.latitude || 42.787259;
  const lng = traps[0]?.longitude || -83.7729;
  const center: [number, number] = [lat, lng];

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={center}
        zoom={15}
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
                <p>{new Date(trap.installedAt).toISOString().split("T")[0]}</p>
                {trap.notes && <p>Notes: {trap.notes}</p>}
              </Card>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
