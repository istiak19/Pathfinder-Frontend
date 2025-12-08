"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingStats } from "@/types/meta.interface";

interface TouristDashboardProps {
    data: BookingStats;
    upcomingBookings?: number; // Optional extra info
    cancelledBookings?: number;
    averageRating?: number;
}

const TouristDashboard = ({
    data,
    upcomingBookings = 0,
    cancelledBookings = 0,
}: TouristDashboardProps) => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight">Tourist Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Total Bookings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Total Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold">{data?.bookingCount}</span>
                    </CardContent>
                </Card>

                {/* Total Reviews */}
                <Card>
                    <CardHeader>
                        <CardTitle>Total Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold">{data?.reviewCount}</span>
                    </CardContent>
                </Card>

                {/* Upcoming Bookings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold">{upcomingBookings}</span>
                    </CardContent>
                </Card>

                {/* Cancelled Bookings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Cancelled Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <span className="text-2xl font-bold">{cancelledBookings}</span>
                    </CardContent>
                </Card>

                {/* Booking Status Distribution */}
                <Card className="md:col-span-2 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Booking Status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {data?.formattedBookingStatusDistribution.map((item) => (
                            <div key={item.status} className="flex justify-between items-center">
                                <span className="capitalize">{item.status}</span>
                                <Badge
                                    variant={
                                        item.status === "CONFIRMED"
                                            ? "default"
                                            : item.status === "ACCEPTED"
                                                ? "secondary"
                                                : "destructive"
                                    }
                                >
                                    {item?.count}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TouristDashboard;