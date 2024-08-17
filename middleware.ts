import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { ADMIN_ROUTES, AUTH_ROUTES, PROTECTED_ROUTES } from "./routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";

  const isProtectedRoute = PROTECTED_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isAdminRoute = ADMIN_ROUTES.includes(nextUrl.pathname);

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
      new URL(`/landing?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  if (isAdminRoute && !isAdmin) {
    return Response.redirect(new URL(`/not-found`, nextUrl));
  }
});

export const config = {
  matcher: [
    "/landing/:path*",
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
