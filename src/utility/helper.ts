import { RouteConfig, UserRole } from "@/types/user.interface";

export const authRoutes = ["/login", "/register", "/forgot-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/reset-password", "/booking"],
    patterns: [], // [/password/change-password, /password/reset-password => /password/*]
};

export const guideProtectedRoutes: RouteConfig = {
    patterns: [/^\/guide/], // Routes starting with "/doctor/*" , "/assistants", "/appointments/*"
    exact: [], // "/assistants"
};

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/], // Routes starting with /admin/*
    exact: [], // "/admins"
};

export const touristProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/], // Routes starting with /dashboard/*
    exact: [], // "/dashboard"
};

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
};

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    };
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
    // if pathname === /dashboard/my-appointments => matches /^\/dashboard/ => true
};

export const getRouteOwner = (pathname: string): "ADMIN" | "TOURIST" | "GUIDE" | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    } else if (isRouteMatches(pathname, guideProtectedRoutes)) {
        return "GUIDE";
    } else if (isRouteMatches(pathname, touristProtectedRoutes)) {
        return "TOURIST";
    } else if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    } else {
        return null;
    };
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") {
        return "/admin/dashboard";
    } else if (role === "GUIDE") {
        return "/guide/dashboard";
    } else if (role === "TOURIST") {
        return "/tourist/dashboard";
    } else {
        return "/";
    };
};

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);
    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    };
    if (routeOwner === role) {
        return true;
    };
    return false;
};