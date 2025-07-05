"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultCenter: [number, number] = [42.6, -83.6]; // e.g. Linden, MI

function LocationMarker({
  onSet,
}: {
  onSet: (lat: number, lng: number) => void;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onSet(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : (
    <Marker
      position={position}
      icon={L.icon({ iconUrl: "/marker-icon.png" })}
    />
  );
}

export function TrapMap({
  onLocationChange,
}: {
  onLocationChange: (lat: number, lng: number) => void;
}) {
  const [userLocation, setUserLocation] =
    useState<[number, number]>(defaultCenter);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        onLocationChange(pos.coords.latitude, pos.coords.longitude);
      });
    }
  }, []);

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker onSet={onLocationChange} />
    </MapContainer>
  );
}
