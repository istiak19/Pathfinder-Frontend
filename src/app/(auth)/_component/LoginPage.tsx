"use client";

import { motion } from "framer-motion";
import logo from "../../../../public/logo/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./LoginForm";

const LoginPage = ({ redirect }: { redirect?: string }) => {
    return (
        <section className="flex min-h-screen flex-col md:flex-row items-center justify-center bg-linear-to-br from-blue-50 to-white dark:from-gray-950 dark:to-black px-4">
            {/* Left Illustration */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden md:flex md:w-1/2 justify-center"
            >
                <Image
                    src="/login-illustration.png"
                    alt="Login illustration"
                    width={600}
                    height={600}
                    className="object-contain drop-shadow-2xl"
                    priority
                />
            </motion.div>

            {/* Right Form */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 flex justify-center"
            >
                <Card className="w-full max-w-md border border-gray-200 dark:border-gray-800 shadow-2xl rounded-3xl bg-white dark:bg-neutral-950 p-6">
                    <Link
                        href="/"
                        className="flex items-center mb-6 justify-center group"
                    >
                        <div className="relative w-12 h-12 overflow-hidden group-hover:scale-105 transition-transform duration-200">
                            <Image src={logo} alt="Logo" fill />
                        </div>
                        <span className="text-2xl ml-3 font-extrabold bg-linear-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                            Pathfinder
                        </span>
                    </Link>

                    <CardHeader className="text-center space-y-1 pb-4">
                        <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            Welcome Back
                        </CardTitle>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Sign in to continue to{" "}
                            <span className="font-semibold">Pathfinder</span>
                        </p>
                    </CardHeader>

                    <CardContent>
                        <LoginForm redirect={redirect} />
                        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
                            Don’t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
};

export default LoginPage;