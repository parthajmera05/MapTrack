import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPinIcon, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export function Login() {
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const result = await response.json();
      if (!result.token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("token", result.token);

      toast({
        title: "Login Successful",
        description: "You have been logged in.",
        variant: "success",
      });

     
      setTimeout(() => {
        navigate("/dashboard");
      }, 300);

    } catch (error) {
      window.alert("Login Failed. Please check your credentials.");
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-100 px-4 min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pt-8">
          <div className="flex justify-center mb-2">
            <MapPinIcon className="h-12 w-12 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-blue-500">Welcome to MapTrack</h2>
          <p className="text-gray-600 mt-2">Sign in to access your interactive maps</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                    </div>
                    <FormControl>
                      <Input 
                        type="password"
                        placeholder="••••••••" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? 
              <a href="/signup" className="text-blue-500 hover:text-blue-700 font-medium ml-1">
                Sign up
              </a>
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 border-t border-gray-100 px-6 py-4">
          <p className="text-xs text-gray-500 text-center w-full">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
