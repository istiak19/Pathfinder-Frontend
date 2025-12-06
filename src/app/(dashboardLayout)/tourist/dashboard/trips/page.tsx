/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";
import TripsCard from "@/app/(dashboardLayout)/_component/tourists/TripsCard";
import { getMeBooking } from "@/services/booking/booking.service";
import { Booking } from "@/types/booking.interface";

const TripsPage = async () => {
    const bookings = await getMeBooking();

    const filteredBookings = bookings?.data?.filter(
        (b: any) => b.status === "CONFIRMED" || b.status === "COMPLETED"
    );

    return (
        <div className="p-6 space-y-4">
            {filteredBookings.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No trips available.</p>
            ) : (
                filteredBookings.map((booking: Booking) => (
                    <TripsCard key={booking.id} booking={booking} />
                ))
            )}
        </div>
    );
};

export default TripsPage;