/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import TripsCard from "@/app/(dashboardLayout)/_component/tourists/TripsCard";
import TablePagination from "@/components/shared/TablePagination";
import { getMeBooking } from "@/services/booking/booking.service";
import { Booking } from "@/types/booking.interface";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Trips – Pathfinder",
    description:
        "View and manage your upcoming and past trips on Pathfinder. Track booking status, tour details, and stay updated with your travel plans.",
    keywords: [
        "Pathfinder",
        "my trips",
        "tourist dashboard",
        "trip management",
        "booking details",
        "upcoming trips",
        "past trips",
        "travel plans",
    ],
};

const TripsPage = async () => {
    const bookings = await getMeBooking();

    const filteredBookings = bookings?.data?.filter(
        (b: any) => b.status === "CONFIRMED" || b.status === "COMPLETED"
    );

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-3 gap-2">
                {filteredBookings.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No trips available.</p>
                ) : (
                    filteredBookings.map((booking: Booking) => (
                        <TripsCard key={booking.id} booking={booking} />
                    ))
                )}
            </div>

            <TablePagination
                currentPage={filteredBookings?.meta?.page || 1}
                totalPages={filteredBookings?.meta?.totalPages || 1}
            />
        </div>
    );
};

export default TripsPage;