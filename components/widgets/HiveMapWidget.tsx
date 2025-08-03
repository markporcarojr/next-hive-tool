"use client";

import { honeyIcon } from "@/data/mapIcons";
import { HiveInput } from "@/lib/schemas/hive";
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

interface MapProps {
  zoom?: number;
  height?: string;
}

export default function HiveMapWidget({
  zoom = 15,
  height = "400px",
}: MapProps) {
  const [hives, setHives] = useState<HiveInput[]>([]);

  useEffect(() => {
    const fetchHive = async () => {
      try {
        const res = await fetch("/api/hives");
        const data = await res.json();
        setHives(data);
      } catch (error) {
        console.error("Error loading hive:", error);
      }
    };
    fetchHive();
  }, []);

  const validHives = hives.filter(
    (h) => typeof h.latitude === "number" && typeof h.longitude === "number"
  );

  const center: [number, number] =
    validHives.length > 0
      ? [validHives[0].latitude!, validHives[0].longitude!]
      : [42.78, -83.77];

  if (!hives || hives.length === 0) {
    return (
      <Card withBorder shadow="sm" radius="md" p="md" style={{ height }}>
        <Title order={4} mb="sm">
          Hive Map
        </Title>
        <Text c="dimmed">No hives found. Please add a hive first.</Text>
      </Card>
    );
  }

  return (
    <Card withBorder shadow="sm" radius="md" p="md" style={{ height }}>
      <Title order={4} mb="sm">
        Hive Map
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
            <Overlay checked name="Swarm hive">
              <LayerGroup>
                {validHives
                  .filter(
                    (hive) =>
                      typeof hive.latitude === "number" &&
                      typeof hive.longitude === "number"
                  )
                  .map((hive) => (
                    <Marker
                      key={hive.id}
                      position={[
                        hive.latitude ?? 42.78,
                        hive.longitude ?? -83.77,
                      ]}
                      icon={honeyIcon}
                    >
                      <Popup>
                        <Card shadow="xs" padding="sm">
                          <Title className="text-center" order={6}>
                            #{hive.hiveNumber}
                          </Title>
                          <Text size="sm">Todos: {hive.todo}</Text>
                          <Text size="sm">
                            Hive Created:{" "}
                            {
                              new Date(hive.hiveDate)
                                .toISOString()
                                .split("T")[0]
                            }
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
