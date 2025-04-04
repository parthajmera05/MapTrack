import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon, Compass, Maximize } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in react-leaflet
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

// Custom map controls component
function MapControls() {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 10 });
  };

  const handleFullscreen = () => {
    const container = map.getContainer();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  return (
    <div className="absolute right-4 top-4 flex flex-col space-y-2 z-[1000]">
      <Button
        variant="secondary"
        size="icon"
        className="bg-white text-gray-700 hover:bg-gray-100 shadow-md"
        onClick={handleZoomIn}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="bg-white text-gray-700 hover:bg-gray-100 shadow-md"
        onClick={handleZoomOut}
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="bg-white text-gray-700 hover:bg-gray-100 shadow-md"
        onClick={handleLocate}
      >
        <Compass className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="bg-white text-gray-700 hover:bg-gray-100 shadow-md"
        onClick={handleFullscreen}
      >
        <Maximize className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Center map on location when it changes
function CenterMap({ coords }) {
  const map = useMap();

  useEffect(() => {
    map.setView(coords, 10);
  }, [coords, map]);

  return null;
}

export default function MapComponent({ location, defaultCenter, defaultZoom }) {
  const latitude = parseFloat(location.latitude);
  const longitude = parseFloat(location.longitude);
  const coordinates =
    isNaN(latitude) || isNaN(longitude) ? defaultCenter : [latitude, longitude];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates}>
        <Popup>
          <div className="text-center p-1">
            <strong>{location.name}</strong>
            <br />
            {location.region}
          </div>
        </Popup>
      </Marker>
      <CenterMap coords={coordinates} />
      <MapControls />
    </MapContainer>
  );
}
