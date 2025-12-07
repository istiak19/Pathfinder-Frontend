import UsersTable from "@/app/(dashboardLayout)/_component/Admin/UserManagemnt/UserTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getAllUser } from "@/services/user/userAllGet";
import { queryStringFormatter } from "@/utility/formatters";
import { Suspense } from "react";

const AdminUserManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const users = await getAllUser();

    const totalPages = Math.ceil(
        (users?.meta?.total || 1) / (users?.meta?.limit || 1)
    );

    console.log(queryString)

    return (
        <div className="space-y-6">
            <ManagementPageHeader
                title="Users Management"
                description="Manage users information and details"
            />

            {/* Search, Filters */}
            {/* <PatientsFilter /> */}

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