"use client";

import { useState } from "react";
import { login, verifyLoginOtp } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");

  async function handlePasswordSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    try {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
        setIsLoading(false);
      } else if (result?.success && result?.email) {
        setEmail(result.email);
        setOtpStep(true);
        toast.success("Verification code sent to your email.");
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const result = await verifyLoginOtp(email, otpCode);
      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
        setIsLoading(false);
      }
      // On success, server action redirects to /jmaster_dashboard
    } catch (err) {
      console.error(err);
      // Redirect throws in try/catch, so we just ignore it
    }
  }

  // OTP Verification Screen
  if (otpStep) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white border border-gray-100 shadow-xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="font-heading text-2xl tracking-wider text-gray-900 mb-2">SECONDARY VERIFICATION</h1>
            <p className="text-xs uppercase tracking-widest text-gray-500">Enter the 8-digit code sent to your email</p>
            <p className="text-xs text-gray-400 mt-2 normal-case">{email}</p>
          </div>

          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-xs uppercase tracking-widest text-gray-700">Verification Code</Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={8}
                placeholder="00000000"
                required
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                className="rounded-none border-gray-200 focus-visible:ring-primary h-14 text-center text-xl tracking-[0.3em] font-mono"
                autoFocus
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm font-medium">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || otpCode.length < 8}
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-none h-12 tracking-widest uppercase font-semibold mt-4"
            >
              {isLoading ? "Verifying..." : "Verify & Access"}
            </Button>

            <button
              type="button"
              onClick={() => { setOtpStep(false); setOtpCode(""); setError(null); }}
              className="w-full text-center text-xs uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors mt-2"
            >
              ← Back to Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Password Login Screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white border border-gray-100 shadow-xl">
        <div className="text-center mb-10">
          <h1 className="font-heading text-2xl tracking-wider text-gray-900 mb-2">SYSTEM ACCESS</h1>
          <p className="text-xs uppercase tracking-widest text-gray-500">Authorized Personnel Only</p>
        </div>

        <form action={handlePasswordSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-700">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@resort.com"
              required
              className="rounded-none border-gray-200 focus-visible:ring-primary h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs uppercase tracking-widest text-gray-700">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="rounded-none border-gray-200 focus-visible:ring-primary h-12"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white hover:bg-primary/90 rounded-none h-12 tracking-widest uppercase font-semibold mt-4"
          >
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
