import { NextRequest, NextResponse } from "next/server";
import { paths, privateRoutes } from "./lib/routes";

export const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const user = req.cookies.get("medicamenteuser")?.value;

  const isProtectedPath =
    privateRoutes.some(path => pathname.startsWith(path)) || pathname == paths.HOME;

  if (isProtectedPath && !user) {
    return NextResponse.redirect(new URL(paths.LOGIN, req.url));
  }

  if (pathname === paths.LOGIN && user) {
    return NextResponse.redirect(new URL(paths.HOME, req.url));
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
