// components/MapPicker.tsx
"use client";

import { Box, Text } from "@mantine/core";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

// Fix default icon issue

const DefaultIcon = L.icon({
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).toString(),
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).toString(),
});

type MapPickerProps = {
  initialLat?: number;
  initialLng?: number;
  onSelect: (lat: number, lng: number) => void;
};

function LocationMarker({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>
        <Text fw={500}>Selected Location</Text>
        <Text size="sm">
          Lat: {position.lat.toFixed(4)}, Lng: {position.lng.toFixed(4)}
        </Text>
      </Popup>
    </Marker>
  ) : null;
}

export function MapPicker({
  initialLat = 42.78,
  initialLng = -83.77,
  onSelect,
}: MapPickerProps) {
  return (
    <Box
      style={{
        border: "2px solid #f4b400",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(244, 180, 0, 0.5)",
      }}
    >
      <MapContainer
        center={[initialLat, initialLng]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <LocationMarker onSelect={onSelect} />
      </MapContainer>
    </Box>
  );
}
export default MapPicker;
