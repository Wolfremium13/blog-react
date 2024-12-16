import {NextResponse, type NextRequest} from "next/server";
import {JwtWebFactory} from "./core/shared/auth/jwt-web-factory";
import {JwtToken} from "./core/shared/auth/models/jwt-token";

export async function middleware(request: NextRequest) {
    function toUnauthorizedPage() {
        return NextResponse.redirect(new URL("/user/unauthorized", request.url));
    }

    try {
        const jwtApi = JwtWebFactory.create();
        const payload = await jwtApi.verify(JwtToken.fromAuthRequest(request));
        if (!payload.isAdministrator()) {
            return toUnauthorizedPage();
        }
        return NextResponse.next();
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return toUnauthorizedPage();
    }
}

export const config = {
    matcher: ["/admin/:path*", "/user/register/:path*"],
};