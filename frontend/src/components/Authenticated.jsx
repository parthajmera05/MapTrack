import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export function Authenticated({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      
      const token = localStorage.getItem("token"); 
      setAuthenticated(!!token);
      setLoading(false);
      
    };

    checkAuth(); 
  }, []); 

  if (loading) {
    console.log("Checking authentication...");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!authenticated) {
    window.alert("You must be logged In");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
