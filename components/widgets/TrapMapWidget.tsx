"use client";

import { honeyIcon } from "@/data/mapIcons";
import { SwarmInput } from "@/lib/schemas/swarmTrap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
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
        // Mock data for UI testing since API endpoints are using Prisma
        setTraps([
          {
            id: "1",
            latitude: 42.78,
            longitude: -83.77,
            label: "Test Trap 1",
            installedAt: new Date("2024-01-15"),
          },
          {
            id: "2", 
            latitude: 42.79,
            longitude: -83.76,
            label: "Test Trap 2",
            installedAt: new Date("2024-01-20"),
          },
        ] as SwarmInput[]);
        
        /* Original API call (disabled for UI testing):
        const res = await fetch("/api/swarm");
        const data = await res.json();
        setTraps(data);
        */
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
    <Card className="h-[400px] relative z-0">
      <CardHeader>
        <CardTitle>Swarm Trap Map</CardTitle>
      </CardHeader>
      <CardContent>
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
                          <div className="p-2">
                            <h5 className="font-semibold">
                              {trap.label || "Unnamed Trap"}
                            </h5>
                            <p className="text-sm">
                              Trap Set:{" "}
                              {
                                new Date(trap.installedAt)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Label: {trap.label}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                </LayerGroup>
              </Overlay>
            </LayersControl>
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
