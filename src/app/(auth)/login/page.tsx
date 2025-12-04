import { Metadata } from "next";
import LoginPage from "../_component/LoginPage";

export const metadata: Metadata = {
    title: "Login | Pathfinder",
    description:
        "Log in to your Pathfinder account to discover destinations, book local guides, and manage your travel experiences.",
    openGraph: {
        title: "Login | Pathfinder",
        description:
            "Sign in to Pathfinder — your trusted platform for exploring new places and booking expert local guides.",
        url: "https://yourdomain.com/login",
        siteName: "Pathfinder",
        images: [
            {
                url: "/og-login.png",
                width: 1200,
                height: 630,
                alt: "Pathfinder Login",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

const Login = async ({ searchParams }: { searchParams?: Promise<{ redirect?: string }> }) => {
    const params = (await searchParams) || {};

    return <LoginPage redirect={params.redirect} />;
};

export default Login;