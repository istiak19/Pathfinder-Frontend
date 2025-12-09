"use client";

import { UserInfo } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ReusableManagementTable from "@/components/shared/ReusableManagementTable";
import UserViewDetailDialog from "./UserViewDetailDialog";
import { usersColumns } from "./userColumns";
import { UserManageDialog } from "./UserManageDialog";
interface UsersTableProps {
    users: UserInfo[];
}

const UsersTable = ({ users }: UsersTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [viewingUser, setViewingUser] = useState<UserInfo | null>(null);

    // combined dialog এর state
    const [dialogState, setDialogState] = useState<{
        mode: "status" | "role";
        user: UserInfo | null;
    }>({
        mode: "status",
        user: null,
    });

    const handleRefresh = () => {
        startTransition(() => router.refresh());
    };

    const handleView = (user: UserInfo) => setViewingUser(user);

    // Status edit button → open status mode dialog
    const handleEditStatus = (user: UserInfo) =>
        setDialogState({ mode: "status", user });

    // Role edit button → open role mode dialog  
    const handleEditRole = (user: UserInfo) =>
        setDialogState({ mode: "role", user });

    return (
        <>
            <ReusableManagementTable
                data={users}
                columns={usersColumns(handleEditRole)}
                onView={handleView}
                onEdit={handleEditStatus}
                getRowKey={(user) => user.id!}
                emptyMessage="No users found"
            />

            {/* Status or Role Edit Dialog */}
            <UserManageDialog
                open={!!dialogState.user}
                mode={dialogState.mode}
                user={dialogState.user || undefined}
                onClose={() => setDialogState({ mode: "status", user: null })}
                onSuccess={() => {
                    setDialogState({ mode: "status", user: null });
                    handleRefresh();
                }}
            />

            {/* View User Detail Dialog */}
            <UserViewDetailDialog
                open={!!viewingUser}
                onClose={() => setViewingUser(null)}
                user={viewingUser!}
            />
        </>
    );
};

export default UsersTable;