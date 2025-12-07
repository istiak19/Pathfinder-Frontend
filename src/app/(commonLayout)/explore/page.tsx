// import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/utility/formatters";
import { Suspense } from "react";
import ListingGrid from "../_component/Explore/ExploreGrid";
import { getListings } from "@/services/guide/listingManagement";
import TablePagination from "@/components/shared/TablePagination";

// ISR: Revalidate every 10 minutes for listings
export const revalidate = 600;

const ExplorePage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const listings = await getListings(queryString);
    console.log(listings)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight"> Explore Tours & Local Experiences</h1>
                    <p className="text-muted-foreground mt-2">
                        Discover unique local experiences and connect with passionate guides
                        worldwide.
                    </p>
                </div>

                {/* Filters */}
                {/* <DoctorSearchFilters specialties={specialties} /> */}

                {/* listings Grid */}
                <Suspense fallback={<TableSkeleton columns={3} />}>
                    <ListingGrid listings={listings.data || []} />
                </Suspense>

                <TablePagination
                    currentPage={listings?.meta?.page || 1}
                    totalPages={listings?.meta?.totalPage || 1}
                />
            </div>
        </div>
    );
};

export default ExplorePage;