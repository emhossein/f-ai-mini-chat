"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
// Toasts are now handled by AuthContext

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading && !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <p className="text-lg text-foreground">Loading authentication...</p>
      </div>
    );
  }

  if (user && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <p className="text-lg text-foreground">Redirecting...</p>
      </div>
    );
  }

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md p-8 space-y-6 glass-card">
        {" "}
        {/* Applied glass-card */}
        <div className="text-center">
          <h1 className="text-3xl font-headline text-primary">
            Welcome to Chatty
          </h1>
          <p className="text-muted-foreground mt-2">Sign in to continue</p>
        </div>
        <Button
          onClick={handleSignIn}
          className="w-full text-base py-3"
          variant="default"
          size="lg"
          disabled={loading}
        >
          <svg
            className="mr-2 h-5 w-5"
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48" /* Updated viewBox for the Google logo */
            fill="currentColor"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
              c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
              s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
              C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
              c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574
              c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C39.308,36.331,44,30.639,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          {loading ? "Verifying..." : "Sign in with Google"}
        </Button>
      </div>
    </div>
  );
}
