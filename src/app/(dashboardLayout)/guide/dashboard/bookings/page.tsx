import GuideBookingFilter from "@/app/(dashboardLayout)/_component/Guide/guideBookingManagemnt/GuideBookingFilter";
import GuideBookingTable from "@/app/(dashboardLayout)/_component/Guide/guideBookingManagemnt/GuideBookingTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getGuideBookings } from "@/services/guide/listingManagement";
import { queryStringFormatter } from "@/utility/formatters";
import { Suspense } from "react";

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