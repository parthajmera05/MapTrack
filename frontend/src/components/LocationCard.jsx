import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronRight } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LocationCard({ location }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/map/${location.id}`);
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <div className="h-48 relative overflow-hidden">
        {location.imageUrl ? (
          <img 
            src={location.imageUrl} 
            alt={location.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <MapContainer 
            center={[location.latitude, location.longitude]} 
            zoom={13} 
            className="w-full h-full"
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[location.latitude, location.longitude]}>
              <Popup>{location.name}</Popup>
            </Marker>
          </MapContainer>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-amber-500 text-white hover:bg-amber-600">
            {location.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{location.name}</h3>
            <p className="text-gray-600 text-sm">{location.region}</p>
          </div>
          <div className="bg-blue-100 text-primary text-xs px-2 py-1 rounded-md">
            {location.locationId}
          </div>
        </div>
        <div className="mt-3 flex items-center text-sm text-gray-600">
          <MapPin className="mr-2 text-primary h-4 w-4" />
          <span>{location.latitude}° N, {location.longitude}° E</span>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="text-primary hover:text-blue-700">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
