"use client";

import { honeyIcon } from "@/app/data/mapIcons";
import { SwarmInput } from "@/lib/schemas/swarmTrap";
import { Card, Text, Title } from "@mantine/core";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

const { BaseLayer, Overlay } = LayersControl;

interface TrapMapProps {
  zoom?: number;
  height?: string;
}

export default function TrapMapWidget({
  zoom = 15,
  height = "400px",
}: TrapMapProps) {
  const [traps, setTraps] = useState<SwarmInput[]>([]);

  useEffect(() => {
    const fetchTraps = async () => {
      try {
        const res = await fetch("/api/swarm");
        const data = await res.json();
        setTraps(data);
      } catch (error) {
        console.error("Error loading traps:", error);
      }
    };
    fetchTraps();
  }, []);

  const center: [number, number] =
    traps.length > 0
      ? [traps[0].latitude, traps[0].longitude]
      : [42.78, -83.77];

  return (
    <Card withBorder shadow="sm" radius="md" p="md" style={{ height }}>
      <Title order={4} mb="sm">
        Swarm Trap Map
      </Title>
      <div
        style={{
          height: "300px",
          width: "100%",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <MapContainer
          center={center}
          zoom={zoom}
          zoomControl={true}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <ZoomControl position="bottomright" />

          <LayersControl position="topright">
            {/* Satellite View */}
            <BaseLayer checked name="Satellite View">
              <TileLayer
                url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={["mt1", "mt2", "mt3"]}
              />
            </BaseLayer>

            {/* OpenStreetMap View */}
            <BaseLayer name="OpenStreetMap">
              <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
            </BaseLayer>
            <Overlay checked name="Swarm Traps">
              <LayerGroup>
                {traps &&
                  traps.length > 0 &&
                  traps.map((trap) => (
                    <Marker
                      key={trap.id}
                      position={[trap.latitude, trap.longitude]}
                      icon={honeyIcon}
                    >
                      <Popup>
                        <Card shadow="xs" padding="sm">
                          <Title order={5}>
                            {trap.label || "Unnamed Trap"}
                          </Title>
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
    </Card>
  );
}
