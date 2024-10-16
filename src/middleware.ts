import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Update session using Supabase
  const response = await updateSession(request);

  // Ignore API routes
  if (pathname.startsWith("/api")) {
    return response;
  }

  // Handle i18n routing
  const defaultLocale = request.headers.get("x-your-custom-locale") || "en";
  const handleI18nRouting = createMiddleware({
    locales: ["en", "de"],
    defaultLocale,
  });

  // Apply i18n middleware
  const i18nResponse = handleI18nRouting(request);

  // Set custom locale header
  i18nResponse.headers.set("x-your-custom-locale", defaultLocale);

  return i18nResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
