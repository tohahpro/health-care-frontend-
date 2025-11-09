
export type UserRole = "Admin" | "Doctor" | "Patient";

type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings"],
    patterns: []
}

const doctorProtectedRoutes: RouteConfig = {
    patterns: [/^\/doctor/, /^\/appointments/],
    exact: []
}

const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/],
    exact: []
}

const patientProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/],
    exact: []
}

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => {
        // return route.startsWith(pathname)
        return route === pathname;
    })
}

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

export const getRouteOwner = (pathname: string): "Admin" | "Doctor" | "Patient" | "Common" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "Admin";
    }
    if (isRouteMatches(pathname, doctorProtectedRoutes)) {
        return "Doctor";
    }
    if (isRouteMatches(pathname, patientProtectedRoutes)) {
        return "Patient";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "Common";
    }

    return null
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "Admin") {
        return "/admin/dashboard"
    }
    if (role === "Doctor") {
        return "/doctor/dashboard"
    }
    if (role === "Patient") {
        return "/dashboard"
    }

    return "/"
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean =>{
    const routeOwner = getRouteOwner(redirectPath);

    if(routeOwner === null || routeOwner === "Common"){
        return true;
    }

    if(routeOwner === role){
        return true;
    }
    return false;
}
