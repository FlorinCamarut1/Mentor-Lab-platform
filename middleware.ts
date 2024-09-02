import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";

  const isProtectedRoute = PROTECTED_ROUTES.some((path) =>
    nextUrl.pathname.startsWith(path),
  );
  const isAuthRoute = AUTH_ROUTES.some((path) =>
    nextUrl.pathname.startsWith(path),
  );

  let callbackUrl = nextUrl.pathname;
  if (nextUrl.search) {
    callbackUrl += nextUrl.search;
  }
  const encodedCallbackUrl = encodeURIComponent(callbackUrl);

  /**
   * If the user is logged in and tries to access a protected route
   */
  if (!isLoggedIn && isProtectedRoute) {
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }
  /**
   * If the user is not logged in and tries to access an auth route
   */
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(
      new URL(`/dashboard?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }
});

export const config = {
  matcher: [
    "/team/:path*",
    "/landing/:path*",
    "/requests/:path*",
    "/profile/:path*",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
