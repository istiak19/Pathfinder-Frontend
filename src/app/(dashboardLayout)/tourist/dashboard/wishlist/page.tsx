export const dynamic = "force-dynamic";
import BookingListClient from "@/app/(dashboardLayout)/_component/tourists/BookingListClient";
import TablePagination from "@/components/shared/TablePagination";
import { getMeBooking } from "@/services/booking/booking.service";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Wishlist – Pathfinder",
    description:
        "View and manage your saved tours and experiences on Pathfinder. Keep track of your favorite destinations and plan future adventures with ease.",
    keywords: [
        "Pathfinder",
        "my wishlist",
        "tourist dashboard",
        "saved tours",
        "favorite experiences",
        "trip planning",
        "travel inspiration",
        "future trips",
    ],
};

export default async function MyBookings() {
    const bookings = await getMeBooking();

    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <BookingListClient bookings={bookings?.data || []} />

            <TablePagination
                currentPage={bookings?.meta?.page || 1}
                totalPages={bookings?.meta?.totalPages || 1}
            />
        </div>
    );
}