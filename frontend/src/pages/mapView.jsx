import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MapComponent from "@/components/MapComponent";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Share2, MapPin, Info, User, Star, Route } from "lucide-react";

export function Mapview() {
  const navigate = useNavigate();
  const { id: locationId } = useParams();
  console.log(locationId);
  const [location, setLocation] = useState(null);
  const [mapConfig, setMapConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const [locationRes, mapRes] = await Promise.all([
          fetch(`${backendUrl}/map/${locationId}`),
          fetch(`${backendUrl}/map`),
        ]);

        if (!locationRes.ok) throw new Error("Failed to fetch location");
        if (!mapRes.ok) throw new Error("Failed to fetch map config");

        const locationData = await locationRes.json();
        const mapConfigData = await mapRes.json();

        setLocation(locationData);
        setMapConfig(mapConfigData);
        
      } catch (err) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    if (locationId) {
      fetchData();
    }
  }, [locationId]);

  // Redirect if no location and not loading
  useEffect(() => {
    if (!isLoading && !location && !error) {
      window.location.href = "/dashboard";
    }
  }, [isLoading, location, error, navigate]);

  const handleBack = () => {
    window.location.href = "/dashboard";
  };

  if (isLoading) {
    return (
      <div className="flex-grow">
        <div className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Button variant="ghost" onClick={handleBack} className="text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
            <div className="text-center">
              <Skeleton className="h-6 w-32 mx-auto" />
              <Skeleton className="h-4 w-40 mx-auto mt-1" />
            </div>
            <div>
              <Button variant="ghost" size="icon" disabled>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full h-[calc(100vh-13rem)] bg-gray-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Skeleton className="h-16 w-16 rounded-full mx-auto" />
              <Skeleton className="h-6 w-48 mx-auto mt-4" />
              <Skeleton className="h-4 w-64 mx-auto mt-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <Button variant="ghost" onClick={handleBack} className="mb-4 text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>

        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!location) return null;

  return (
    <div className="flex-grow min-h-screen">
      <div className="bg-white shadow-md p-2 ">
        <div className=" flex justify-between items-center">
          <Button variant="ghost" onClick={handleBack} className="text-primary ">
            <ArrowLeft className="mr-1 h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          
        </div>
      </div>

      <div className="w-full h-[calc(100vh-2rem)] relative">
        <MapComponent
          location={location}
          defaultCenter={mapConfig?.defaultCenter || [20.5937, 78.9629]}
          defaultZoom={mapConfig?.defaultZoom || 5}
        />

        
      </div>
    </div>
  );
}
