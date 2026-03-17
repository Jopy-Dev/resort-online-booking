"use server";

import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Step 1: Validate password credentials.
 * If valid, immediately sign out to prevent dashboard access,
 * then trigger an Email OTP for secondary verification.
 */
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const supabase = await createClient();

  // Step 1a: Verify credentials
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Step 1b: Immediately revoke the session to prevent bypassing OTP
  await supabase.auth.signOut();

  // Step 1c: Fire the Email OTP to the admin's inbox
  const { error: otpError } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false, // Prevent creating new accounts
    },
  });

  if (otpError) {
    return { error: otpError.message };
  }

  // Return success with email for the OTP verification step
  return { success: true, email };
}

/**
 * Step 2: Verify the 6-digit OTP code sent to the admin's email.
 * On success, establish the final authenticated session and redirect.
 */
export async function verifyLoginOtp(email: string, token: string) {
  if (!email || !token) {
    return { error: "Email and verification code are required" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/jmaster_dashboard");
  redirect("/jmaster_dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
