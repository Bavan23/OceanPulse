import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { oauthLogin } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (error) {
          setStatus("error");
          setError(error);
          return;
        }

        if (!token) {
          setStatus("error");
          setError("No authentication token received");
          return;
        }

        // Store the token and update auth state
        localStorage.setItem("authToken", token);

        // Try to decode and validate the token (basic check)
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const user = {
            id: payload.sub || payload.user_id,
            email: payload.email,
            name: payload.name,
            role: payload.role || "citizen",
            avatar: payload.avatar,
          };

          oauthLogin(user);
          setStatus("success");

          // Redirect based on user role after a short delay
          setTimeout(() => {
            if (user.role === "admin") {
              navigate("/admin/dashboard");
            } else {
              navigate("/citizen/dashboard");
            }
          }, 2000);
        } catch (decodeError) {
          console.error("Token decode error:", decodeError);
          setStatus("error");
          setError("Invalid authentication token");
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        setStatus("error");
        setError("Authentication failed. Please try again.");
      }
    };

    handleOAuthCallback();
  }, [searchParams, oauthLogin, navigate]);

  const handleRetry = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {status === "loading" && "Signing you in..."}
            {status === "success" && "Welcome to OceanPulse!"}
            {status === "error" && "Authentication Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "loading" && (
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-gray-600 text-center">
                Please wait while we complete your sign-in process...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
              <p className="text-gray-600 text-center">
                Successfully signed in with Google! Redirecting you to your dashboard...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error || "An error occurred during authentication."}
                </AlertDescription>
              </Alert>
              <Button onClick={handleRetry} className="w-full">
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OAuthSuccess;
