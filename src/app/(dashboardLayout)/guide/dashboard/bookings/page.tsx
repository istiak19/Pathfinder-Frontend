import GuideBookingFilter from "@/app/(dashboardLayout)/_component/Guide/guideBookingManagement/GuideBookingFilter";
import GuideBookingTable from "@/app/(dashboardLayout)/_component/Guide/guideBookingManagement/GuideBookingTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getGuideBookings } from "@/services/listings/listingManagement";
import { queryStringFormatter } from "@/utility/formatters";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Guide Bookings – Pathfinder",
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
    const guideBookings = await getGuideBookings(queryString);
    const totalPages = Math.ceil(
        guideBookings?.meta?.total / guideBookings?.meta?.limit
    );

    return (
        <div className="space-y-5">
            <ManagementPageHeader
                title="Bookings Management"
                description="Manage guide booking information and details"
            />
            <GuideBookingFilter />
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <GuideBookingTable bookings={guideBookings?.data} />
                <TablePagination
                    currentPage={guideBookings?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default BookingPage;