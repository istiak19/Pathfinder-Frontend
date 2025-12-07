import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/utility/formatters";
import { Suspense } from "react";
import { Metadata } from "next";
import BookingsTable from "@/app/(dashboardLayout)/_component/Admin/BookingManagement/BookingsTable";
import { getAllBookings } from "@/services/booking/booking.service";
import AdminBookingFilter from "@/app/(dashboardLayout)/_component/Admin/BookingManagement/AdminBookingFilter";

export const metadata: Metadata = {
    title: "Admin Bookings – Pathfinder",
    description:
        "Manage all your bookings as a local guide on Pathfinder. Track booking statuses, view tourist information, and stay updated on your tours and reservations.",
    keywords: [
        "Pathfinder",
        "guide bookings",
        "local guide dashboard",
        "bookings management",
        "tour management",
        "tourist information",
        "travel analytics",
        "tour reservations",
    ],
};

const BookingPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const bookings = await getAllBookings(queryString);
    const totalPages = Math.ceil(
        bookings?.meta?.total / bookings?.meta?.limit
    );

    return (
        <div className="space-y-5">
            <ManagementPageHeader
                title="Bookings Management"
                description="Manage admin booking information and details"
            />
            <AdminBookingFilter />
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <BookingsTable bookings={bookings?.data} />
                <TablePagination
                    currentPage={bookings?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default BookingPage;