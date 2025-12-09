import { Metadata } from "next";
import LoginPage from "../_component/LoginPage";

export const metadata: Metadata = {
    title: "Login – Pathfinder",
    description:
        "Access your Pathfinder account to manage bookings, explore tours, and connect with local guides. Secure login for tourists, guides, and admins.",
    keywords: [
        "Pathfinder login",
        "login",
        "user login",
        "account access",
        "tourist login",
        "guide login",
        "admin login",
        "travel platform login",
        "secure login",
    ],
};

const Login = async ({ searchParams }: { searchParams?: Promise<{ redirect?: string }> }) => {
    const params = (await searchParams) || {};

    return <LoginPage redirect={params.redirect} />;
};

export default Login;