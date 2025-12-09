import { Metadata } from "next";
import RegisterPage from "../_component/RegisterPage";

export const metadata: Metadata = {
    title: "Create Account – Pathfinder",
    description:
        "Sign up on Pathfinder to explore tours, book travel experiences, or become a local guide. Create your account in minutes and start your journey today.",
    keywords: [
        "Pathfinder signup",
        "create account",
        "register",
        "tourist signup",
        "guide signup",
        "travel account create",
        "tour booking account",
        "local guide registration",
        "travel platform signup",
        "new user registration",
    ],
};

const Register = () => {
    return <RegisterPage />;
};

export default Register;