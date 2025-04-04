import { useState, useEffect } from "react";
import LocationCard from "@/components/LocationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DashBoard() {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const backendUrl = import.meta.env.BACKEND_URL;
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${backendUrl}/locations`);
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLocations = locations?.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch ;
  });

  const handleLogout = async () => {
    try {
      await fetch(`${backendUrl}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);   
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-6xl mx-auto">
      
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">MapTrack</h1>
        <Button variant="ghost" onClick={handleLogout} className="flex items-center text-red-600">
          <LogOut className="h-5 w-5 mr-2" /> Logout
        </Button>
      </nav>

      
      <div className="container mx-auto px-4 py-8 flex-grow">
        
       
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Your Map Locations</h2>
          <p className="text-gray-600">Select a location to view detailed map</p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search locations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Location Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-4/5" />
                  <div className="flex justify-between pt-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations?.length ? (
              filteredLocations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))
            ) : (
              <div className="col-span-3 py-8 text-center text-gray-500">
                No locations found. Try adjusting your search or filter.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
