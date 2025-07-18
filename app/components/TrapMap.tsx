// components/TrapMap.tsx
"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  ZoomControl,
} from "react-leaflet";
import { Card, Text, Title } from "@mantine/core";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SwarmInput } from "@/lib/schemas/swarmTrap";

const { BaseLayer, Overlay } = LayersControl;

const honeyIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface TrapMapProps {
  zoom?: number;
  height?: string;
}

export default function TrapMap({ zoom = 15, height = "400px" }: TrapMapProps) {
  const [traps, setTraps] = useState<SwarmInput[]>([]);

  useEffect(() => {
    fetch("/api/swarm")
      .then((res) => res.json())
      .then(setTraps)
      .catch((err) => console.error("Error loading traps", err));
  }, []);

  const center: [number, number] =
    traps.length > 0
      ? [traps[0].latitude, traps[0].longitude]
      : [42.78, -83.77];

  return (
    <div style={{ width: "100%", height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={true}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <ZoomControl position="bottomright" />

        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
          </BaseLayer>

          <Overlay checked name="Swarm Traps">
            <LayerGroup>
              {traps.map((trap) => (
                <Marker
                  key={trap.id}
                  position={[trap.latitude, trap.longitude]}
                  icon={honeyIcon}
                >
                  <Popup>
                    <Card shadow="xs" padding="sm">
                      <Title order={5}>{trap.label || "Unnamed Trap"}</Title>
                      <Text size="sm">
                        Trap Set:{" "}
                        {new Date(trap.installedAt).toLocaleDateString()}
                      </Text>
                      <Text size="sm" c="dimmed">
                        Label: {trap.label}
                      </Text>
                    </Card>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}
