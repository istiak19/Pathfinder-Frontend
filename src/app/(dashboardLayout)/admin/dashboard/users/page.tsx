import UsersFilter from "@/app/(dashboardLayout)/_component/Admin/UserManagement/UserFilter";
import UsersTable from "@/app/(dashboardLayout)/_component/Admin/UserManagement/UserTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getAllUser } from "@/services/user/userAllGet";
import { queryStringFormatter } from "@/utility/formatters";
import { Metadata } from "next";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "All Users – Pathfinder",
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

const AdminUserManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const users = await getAllUser(queryString);
    

    const totalPages = Math.ceil(
        (users?.meta?.total || 1) / (users?.meta?.limit || 1)
    );

    return (
        <div className="space-y-6">
            <ManagementPageHeader
                title="Users Management"
                description="Manage users information and details"
            />

            {/* Search, Filters */}
            <UsersFilter />

            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <UsersTable users={users?.data || []} />
                <TablePagination
                    currentPage={users?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default AdminUserManagementPage;