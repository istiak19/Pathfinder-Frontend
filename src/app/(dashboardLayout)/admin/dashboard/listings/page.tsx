import ListingsFilters from "@/app/(dashboardLayout)/_component/Guide/ListingsManagement/ListingsFilters";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getListings } from "@/services/listings/listingManagement";
import { queryStringFormatter } from "@/utility/formatters";
import { Suspense } from "react";
import { Metadata } from "next";
export const dynamic = "force-dynamic";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import ListingsTable from "@/app/(dashboardLayout)/_component/Admin/ListingManagement/ListingsTable";

export const metadata: Metadata = {
    title: "All Listings – Pathfinder",
    description:
        "Browse all available tours and experiences with local guides on Pathfinder. Discover destinations, explore categories, and book your next adventure.",
    keywords: [
        "Pathfinder",
        "all listings",
        "tour listings",
        "travel experiences",
        "local guides",
        "tourism platform",
        "book tours",
        "adventure trips",
    ],
};

const ListingManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const listing = await getListings(queryString);
    const totalPages = Math.ceil(
        listing?.meta?.total / listing?.meta?.limit
    );

    return (
        <div className="space-y-5">
            <ManagementPageHeader
                title="Listings Management"
                description="Manage Listings information and details"
            />
            <ListingsFilters />
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <ListingsTable listings={listing?.data} />
                <TablePagination
                    currentPage={listing?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default ListingManagementPage;