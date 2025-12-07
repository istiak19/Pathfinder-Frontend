/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import CountUp from "react-countup";
import { AdminDashboardMeta } from "@/types/meta.interface";

interface AdminDashboardClientProps {
    meta: AdminDashboardMeta;
}

const COLORS = ["#4f46e5", "#f59e0b", "#10b981", "#ef4444", "#6366f1"];

const AdminDashboardClient = ({ meta }: AdminDashboardClientProps) => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-semibold tracking-tight">Admin Dashboard</h1>

            {/* Animated Counters */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <DashboardCard title="Tourists" value={meta.touristCount} color="bg-indigo-600" />
                <DashboardCard title="Guides" value={meta.guideCount} color="bg-yellow-500" />
                <DashboardCard title="Admins" value={meta.adminCount} color="bg-green-500" />
                <DashboardCard title="Bookings" value={meta.bookingCount} color="bg-blue-500" />
                <DashboardCard title="Payments" value={meta.paymentCount} color="bg-red-500" />
                <DashboardCard title="Revenue" value={meta.totalRevenue._sum.amount ?? 0} prefix="$" color="bg-purple-500" />
            </div>

            {/* Bar Chart - Monthly Bookings */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Monthly Bookings</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={meta.barChartData}>
                        <XAxis
                            dataKey="month"
                            tickFormatter={(val) => new Date(val).toLocaleString("default", { month: "short" })}
                            stroke="#fff"
                        />
                        <YAxis stroke="#fff" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#4f46e5" radius={[5, 5, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart - Booking Status */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Booking Status Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={meta.pieChartData as unknown as any[]} dataKey="count" nameKey="status" outerRadius={100} label>
                            {meta.pieChartData.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

interface DashboardCardProps {
    title: string;
    value: number;
    prefix?: string;
    color: string;
}

const DashboardCard = ({ title, value, prefix = "", color }: DashboardCardProps) => (
    <div className={`rounded-lg p-6 shadow-lg ${color} flex flex-col items-center justify-center`}>
        <div className="text-3xl font-bold text-white">
            <CountUp end={value} duration={1.5} prefix={prefix} />
        </div>
        <div className="text-gray-200 mt-2">{title}</div>
    </div>
);

export default AdminDashboardClient;