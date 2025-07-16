import { NextRequest, NextResponse } from "next/server";
import { logoutUser, clearSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('session')?.value;

    if (token) {
      await logoutUser(token);
    }

    const response = NextResponse.json({
      message: "Logout successful",
    });

    // Clear session cookie
    clearSessionCookie(response);

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    
    // Even if there's an error, clear the cookie and return success
    const response = NextResponse.json({
      message: "Logout successful",
    });

    clearSessionCookie(response);
    return response;
  }
} 