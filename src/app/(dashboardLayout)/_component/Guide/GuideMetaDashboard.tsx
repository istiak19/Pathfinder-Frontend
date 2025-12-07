"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, Users, Star, Wallet } from "lucide-react";
import { IGuideDashboardMeta } from "@/types/meta.interface";

interface metaProps {
    meta: IGuideDashboardMeta;
}

export default function GuideDashboard({ meta }: metaProps) {
    const bookingCount = meta?.bookingCount || 0;
    const reviewCount = meta?.reviewCount || 0;
    const touristCount = meta?.touristCount || 0;
    const totalRevenue = meta?.totalRevenue?._sum?.amount || 0;

    const statusData = meta?.formattedBookingStatusDistribution || [];

    const revenueData = [
        { month: "Jan", revenue: 1000 },
        { month: "Feb", revenue: 1500 },
        { month: "Mar", revenue: 1200 },
        { month: "Apr", revenue: 2200 },
        { month: "May", revenue: 1800 },
        { month: "Jun", revenue: 2500 },
    ];

    const counterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen w-full bg-[#0b0f19] text-gray-100 p-6 space-y-8">
            <h1 className="text-3xl font-semibold tracking-tight">Guide Dashboard</h1>

            {/* Counters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div variants={counterVariants} initial="hidden" animate="visible">
                    <Card className="bg-[#111827] border-gray-700 shadow-xl">
                        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Users className="w-5 h-5" />Tourists</CardTitle></CardHeader>
                        <CardContent><p className="text-4xl font-bold">{touristCount}</p></CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={counterVariants} initial="hidden" animate="visible" transition={{ delay: .1 }}>
                    <Card className="bg-[#111827] border-gray-700 shadow-xl">
                        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><TrendingUp className="w-5 h-5" />Bookings</CardTitle></CardHeader>
                        <CardContent><p className="text-4xl font-bold">{bookingCount}</p></CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={counterVariants} initial="hidden" animate="visible" transition={{ delay: .2 }}>
                    <Card className="bg-[#111827] border-gray-700 shadow-xl">
                        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Star className="w-5 h-5" />Reviews</CardTitle></CardHeader>
                        <CardContent><p className="text-4xl font-bold">{reviewCount}</p></CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={counterVariants} initial="hidden" animate="visible" transition={{ delay: .3 }}>
                    <Card className="bg-[#111827] border-gray-700 shadow-xl">
                        <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Wallet className="w-5 h-5" />Revenue</CardTitle></CardHeader>
                        <CardContent><p className="text-4xl font-bold">${totalRevenue}</p></CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart */}
                <Card className="bg-[#111827] border-gray-700 shadow-xl p-4">
                    <CardHeader><CardTitle>Monthly Revenue</CardTitle></CardHeader>
                    <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                                <XAxis dataKey="month" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151" }} />
                                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Bar Chart */}
                <Card className="bg-[#111827] border-gray-700 shadow-xl p-4">
                    <CardHeader><CardTitle>Bookings by Status</CardTitle></CardHeader>
                    <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statusData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                                <XAxis dataKey="status" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151" }} />
                                <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}