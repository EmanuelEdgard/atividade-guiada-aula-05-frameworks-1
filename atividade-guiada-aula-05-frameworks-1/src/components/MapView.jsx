import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Paper } from "@mui/material";
import "leaflet/dist/leaflet.css";

const MapView = ({ coordinates }) => {
  const mapKey = `${coordinates.lat}-${coordinates.lng}`;

  return (
    <Paper
      elevation={4}
      sx={{
        mt: 3,
        height: "400px",
        width: "100%",
        overflow: "hidden",
        borderRadius: 3
      }}
    >
      <MapContainer
        key={mapKey}
        center={[coordinates.lat, coordinates.lng]}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>Localização do endereço.</Popup>
        </Marker>
      </MapContainer>
    </Paper>
  );
};

export default MapView;