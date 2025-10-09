import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export function Maps({ trek, userLocation }) {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (!userLocation || !trek.coordinates) return;
    const R = 6371; // Earth's radius in km
    const dLat =
      ((userLocation.lat - trek.coordinates.latitude) * Math.PI) / 180;
    const dLon =
      ((userLocation.lng - trek.coordinates.longitude) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((trek.coordinates.latitude * Math.PI) / 180) *
        Math.cos((userLocation.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    setDistance(R * c);
  }, [trek.coordinates, userLocation]);

  return (
    <div>
      <MapContainer
        center={[trek.coordinates.latitude, trek.coordinates.longitude]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ margin: "auto", height: "800px", width: "300px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[trek.coordinates.latitude, trek.coordinates.longitude]}
        >
          <Popup>{trek.name}</Popup>
        </Marker>
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        {userLocation && (
          <Polyline
            positions={[
              [userLocation.lat, userLocation.lng],
              [trek.coordinates.latitude, trek.coordinates.longitude],
            ]}
            color="blue"
          >
            <Tooltip direction="center" permanent>
              {distance?.toFixed(2)} km
            </Tooltip>
          </Polyline>
        )}
      </MapContainer>
    </div>
  );
}
