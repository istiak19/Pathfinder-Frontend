import ListingManagementHeader from "@/app/(dashboardLayout)/_component/Guide/ListingsManagement/ListingManagementHeader";
import ListingsFilters from "@/app/(dashboardLayout)/_component/Guide/ListingsManagement/ListingsFilters";
import ListingTable from "@/app/(dashboardLayout)/_component/Guide/ListingsManagement/ListingTable";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getListings } from "@/services/guide/listingManagement";
import { getMeUser } from "@/services/user/getMeUser";
import { queryStringFormatter } from "@/utility/formatters";
import { Suspense } from "react";

const ListingManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj); // {searchTerm: "John", speciality: "Cardiology" => "?searchTerm=John&speciality=Cardiology"};
    const listing = await getListings(queryString);
    const user = await getMeUser();
    const totalPages = Math.ceil(
        listing?.meta?.total / listing?.meta?.limit
    );

    return (
        <div className="space-y-5">
            <ListingManagementHeader user={user?.data} />
            <ListingsFilters />
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <ListingTable listings={listing?.data} />
                <TablePagination
                    currentPage={listing?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default ListingManagementPage;