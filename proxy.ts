import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
  // Make these routes public
  if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/shop") {
    return;
  }
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};