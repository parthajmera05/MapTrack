import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function LocationCard({ location }) {
  const [, navigate] = useLocation();
  
  const handleClick = () => {
    navigate(`/map/${location.locationId}`);
  };
  
  const getLastUpdatedText = () => {
    if (!location.lastUpdated) return "Recently updated";
    
    try {
      const date = typeof location.lastUpdated === 'string' 
        ? new Date(location.lastUpdated) 
        : location.lastUpdated;
        
      return `Last updated: ${formatDistanceToNow(date, { addSuffix: true })}`;
    } catch (error) {
        console.error('Error parsing last updated date:', error);
      return "Recently updated";
    }
  };
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={handleClick}
    >
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {location.imageUrl ? (
          <img 
            src={location.imageUrl} 
            alt={location.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <MapPin className="h-12 w-12 text-gray-400" />
          </div>
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
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xs text-gray-500">{getLastUpdatedText()}</span>
          </div>
          <button className="text-primary hover:text-blue-700">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
