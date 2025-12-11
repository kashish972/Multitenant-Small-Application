import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTenantBySlug } from "./app/lib/getTenant";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const segments = pathname.split("/").filter(Boolean);

  const tenantSlug = segments[0];

  if (!tenantSlug) return NextResponse.next();

  const tenant = await getTenantBySlug(tenantSlug);

  if (!tenant) {
    return NextResponse.redirect(new URL("/404", req.url));
  }

  req.headers.set("X-Tenant-Id", tenant._id.toString());
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run middleware on everything except:
    // - API routes
    // - /create-tenant page
    // - Next.js internals
    "/((?!api|create-tenant|_next/static|_next/image|favicon.ico).*)",
  ],
};

