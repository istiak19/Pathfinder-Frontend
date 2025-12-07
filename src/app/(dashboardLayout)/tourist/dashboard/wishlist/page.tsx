export const dynamic = "force-dynamic";
import BookingCard from "@/app/(dashboardLayout)/_component/tourists/BookingCard";
import TablePagination from "@/components/shared/TablePagination";
import { getMeBooking } from "@/services/booking/booking.service";
import { Booking } from "@/types/booking.interface";

export default async function MyBookings() {
    const bookings = await getMeBooking();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-4 grid grid-cols-3 gap-3 items-center justify-center">
                {bookings?.data?.map((booking: Booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
            </div>
            <TablePagination
                currentPage={bookings?.meta?.page || 1}
                totalPages={bookings?.meta?.totalPages || 1}
            />
        </div>
    );
}